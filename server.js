const express = require('express')
const port = process.env.PORT || 3000
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express();

const animeRoutes = require('./api/routes/anime');
const categoryRoutes = require('./api/routes/categories');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
});

app.use('/anime', animeRoutes);
app.use('/categories', categoryRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(port, () => console.log(`Application is listening at http://localhost:${port}`))
