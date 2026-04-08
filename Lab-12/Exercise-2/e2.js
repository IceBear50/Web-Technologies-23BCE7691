const express = require('express');
const app = express();

const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
    next();
};

app.use(loggerMiddleware);

const routeSpecificMiddleware = (req, res, next) => {
    console.log('Special middleware for /admin route triggered');
    next();
};

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/admin', routeSpecificMiddleware, (req, res) => {
    res.send('Admin Dashboard');
});

app.listen(3000, () => console.log('Middleware server on port 3000'));