import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

const APEX_HOST = "mundoencantoviajero.com";
const CANONICAL_HOST = `www.${APEX_HOST}`;

function wwwRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
  if (url.hostname !== APEX_HOST) return undefined;

  // Hostinger terminates TLS in front of this app and forwards plain HTTP
  // internally, so request.url's protocol reflects that internal hop, not
  // what the visitor actually used — force https rather than trust it.
  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  return Response.redirect(url.toString(), 301);
}

// One year, no includeSubDomains: some subdomains of this apex may not be
// HTTPS-only, so forcing HTTPS there too could break them.
const HSTS_VALUE = "max-age=31536000";

function withHsts(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Strict-Transport-Security", HSTS_VALUE);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error("normalized catastrophic SSR response:", consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const redirect = wwwRedirect(request);
    if (redirect) return withHsts(redirect);

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withHsts(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error("Unhandled error in server fetch:", error);
      return withHsts(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
