const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const whitelist = [];
const options = {
    origin: (origin, callback) => {
        (whitelist.includes(origin) || !origin) 
            ? callback(null, true) 
            : callback(new Error('Acceso no permitido'));
    },
};
app.use(cors(options));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening at http://localhost: ${port}`);
});
