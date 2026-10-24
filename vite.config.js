import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      {
        name: 'local-api-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url || '';
            if (url.startsWith('/api/enquiry') || url.startsWith('/api/contact')) {
              try {
                const { default: handler } = await import('./api/enquiry.js');

                if (req.method === 'POST') {
                  const chunks = [];
                  for await (const chunk of req) {
                    chunks.push(chunk);
                  }
                  const rawBody = Buffer.concat(chunks).toString('utf-8');
                  try {
                    req.body = rawBody ? JSON.parse(rawBody) : {};
                  } catch {
                    req.body = {};
                  }
                } else {
                  req.body = {};
                }

                if (!res.status) {
                  res.status = (code) => {
                    res.statusCode = code;
                    return res;
                  };
                }
                if (!res.json) {
                  res.json = (data) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                    return res;
                  };
                }

                await handler(req, res);
                return;
              } catch (err) {
                console.error('[DEV_API_ERROR]', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
                return;
              }
            }
            next();
          });
        }
      }
    ],
    server: {
      port: 3000,
      open: false
    }
  };
});
