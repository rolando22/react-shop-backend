const express = require('express');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/route-new', (req, res) => {
    res.send('Hi, I am new route');
});

app.get('/product', (req, res) => {
    res.json({
        name: 'Product 1',
        price: 1000,
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost: ${port}`);
});
