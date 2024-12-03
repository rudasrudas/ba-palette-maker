const ngrok = require('ngrok');
const next = require('next');
const { createServer } = require('http');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(handle).listen(port, async () => {
    console.log(`> Ready on http://localhost:${port}`);
    // Start ngrok tunnel
    const url = await ngrok.connect(port);
    console.log(`> ngrok tunnel set up: ${url}`);
  });
});
