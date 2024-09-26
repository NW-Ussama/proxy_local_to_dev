const express = require('express');
const httpProxy = require('http-proxy');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use((req, res) => {
    req.headers['cookie'] = process.env.AUTH_COOKIE;

    const targetUrl = process.env.TARGET_URL;

    proxy.web(req, res, { target: targetUrl, changeOrigin: true });
});

app.listen(3005, () => {
    console.log('Proxy server listening on http://localhost:3005');
});

