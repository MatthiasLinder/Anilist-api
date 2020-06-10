const express = require('express')
const port = process.env.PORT || 3000;

const app = express();

const animeRoutes = require('./api/routes/anime');
const categoryRoutes = require('./api/routes/categories');

app.use('/anime', animeRoutes);
app.use('/categories', categoryRoutes);

app.listen(port, () => console.log(`Application is listening at http://localhost:${port}`))
