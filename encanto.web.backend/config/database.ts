import path from 'path';
import type { Core } from '@strapi/strapi';
import { isDatabaseClientKind } from '@strapi/database';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Database => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (!isDatabaseClientKind(client)) {
    throw new Error(
      `Unsupported DATABASE_CLIENT: ${client}. Use "postgres", "mysql", or "sqlite".`
    );
  }

  // env()/env.int() solo aplican el default cuando la variable NO existe.
  // En hostings donde queda declarada pero vacía (ej. "DATABASE_HOST="),
  // devuelven el string vacío/NaN en vez de caer al default, y la conexión
  // falla en silencio. Estos helpers tratan "vacío" como "no seteado".
  const strEnv = (key: string, fallback: string): string => {
    const raw = env(key);
    return raw && raw.trim() !== '' ? raw : fallback;
  };
  const intEnv = (key: string, fallback: number): number => {
    const raw = env(key);
    const parsed = raw ? parseInt(raw, 10) : NaN;
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const connections: Record<Core.Config.Database.ClientKind, Core.Config.Database['connection']> = {
    mysql: {
      client: 'mysql',
      connection: {
        host: strEnv('DATABASE_HOST', 'localhost'),
        port: intEnv('DATABASE_PORT', 3306),
        database: strEnv('DATABASE_NAME', 'strapi'),
        user: strEnv('DATABASE_USERNAME', 'strapi'),
        password: strEnv('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      client: 'postgres',
      connection: {
        connectionString: env('DATABASE_URL'),
        host: strEnv('DATABASE_HOST', 'localhost'),
        port: intEnv('DATABASE_PORT', 5432),
        database: strEnv('DATABASE_NAME', 'strapi'),
        user: strEnv('DATABASE_USERNAME', 'strapi'),
        password: strEnv('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  const resolved = connections[client];
  if (client === 'mysql' || client === 'postgres') {
    const { host, port, database, user } = resolved.connection as Record<string, unknown>;
    // eslint-disable-next-line no-console
    console.log(
      `[database.ts] DATABASE_CLIENT=${client} host=${host} port=${port} database=${database} user=${user}`
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(`[database.ts] DATABASE_CLIENT=${client}`);
  }

  return {
    connection: {
      ...resolved,
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

export default config;
