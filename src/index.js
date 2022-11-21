const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening at http://localhost: ${port}`);
});
