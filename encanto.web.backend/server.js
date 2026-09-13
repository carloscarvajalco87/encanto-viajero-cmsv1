'use strict';

// Entry file para hostings (como el "Node.js entry file" de Hostinger) que
// arrancan la app con `node server.js` en vez de vía CLI (`strapi start`).
// Replica exactamente lo que hace `strapi start` internamente (ver
// node_modules/@strapi/strapi/dist/src/cli/commands/start.js): crea la app
// apuntando al build ya compilado en `dist/` (generado por `npm run build`)
// y la arranca.

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const path = require('path');
const { createStrapi } = require('@strapi/strapi');

const appDir = __dirname;
const distDir = path.join(appDir, 'dist');

createStrapi({ appDir, distDir }).start();
