'use strict';

// Entry file para hostings (como el "Node.js entry file" de Hostinger) que
// arrancan la app con `node server.js` en vez de vía CLI (`strapi start`).
// Replica exactamente lo que hace `strapi start` internamente (ver
// node_modules/@strapi/strapi/dist/src/cli/commands/start.js): crea la app
// apuntando al build ya compilado en `dist/` (generado por `npm run build`)
// y la arranca.

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const fs = require('fs');
const path = require('path');
const { createStrapi } = require('@strapi/strapi');

const appDir = __dirname;
const distDir = path.join(appDir, 'dist');

// Hostinger (and similar "rebuild from git on every deploy" Node hosts) give
// this app a brand-new directory on every deploy, so anything written to
// public/uploads by Strapi's local upload provider is wiped on the next
// deploy. If PERSISTENT_UPLOADS_DIR points at a stable path outside that
// per-deploy directory (e.g. a folder in the domain's home dir, alongside
// the versioned build folders rather than inside one of them), replace the
// fresh public/uploads with a symlink to it so uploaded media survives
// redeploys. No-op locally / anywhere this env var isn't set.
const persistentUploadsDir = process.env.PERSISTENT_UPLOADS_DIR;
if (persistentUploadsDir) {
  const uploadsPath = path.join(appDir, 'public', 'uploads');
  fs.mkdirSync(persistentUploadsDir, { recursive: true });

  const existing = fs.existsSync(uploadsPath) ? fs.lstatSync(uploadsPath) : null;
  if (!existing) {
    fs.symlinkSync(persistentUploadsDir, uploadsPath, 'dir');
  } else if (!existing.isSymbolicLink()) {
    // Fresh checkout's public/uploads (only ever contains .gitkeep) — move
    // anything in it into the persistent dir first, then swap in the symlink.
    for (const entry of fs.readdirSync(uploadsPath)) {
      const dest = path.join(persistentUploadsDir, entry);
      if (!fs.existsSync(dest)) fs.renameSync(path.join(uploadsPath, entry), dest);
    }
    fs.rmSync(uploadsPath, { recursive: true, force: true });
    fs.symlinkSync(persistentUploadsDir, uploadsPath, 'dir');
  }
}

createStrapi({ appDir, distDir }).start();
