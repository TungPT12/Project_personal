const express = require('express')
const cors = require('cors')
const app = express()

const movieRoutes = require('./api/movie')
const genreRoutes = require('./api/genre')
const mediaRoutes = require('./api/media')
const languageRoutes = require('./api/language')
const yearRoutes = require('./api/year')
const notFoundRoutes = require('./api/404')
const authorization = require('./middleware/authorize')
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/', (req, res, next) => {
    next();
})

app.use(authorization)
app.use(mediaRoutes)
app.use(genreRoutes)
app.use(languageRoutes)
app.use(yearRoutes)
app.use(movieRoutes)
app.use(notFoundRoutes)

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}/`)
})
