const express = require('express')
const port = process.env.PORT || 3000
const morgan = require('morgan')

const app = express();

const animeRoutes = require('./api/routes/anime');
const categoryRoutes = require('./api/routes/categories');

app.use(morgan('dev'));

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
