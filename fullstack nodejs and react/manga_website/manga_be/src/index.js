const express = require('express');
const cors = require('cors');
require('dotenv').config()
const connectMongoose = require('./configs/mongoose');

const mangaRouterAdmin = require('./routers/admin/manga')
const uploadChapterImagesRouter = require('./routers/admin/uploadChapterImages');

const mangaRouter = require('./routers/client/manga');
const typeRouter = require('./routers/client/type');
const chapterRouter = require('./routers/client/chapter');

const app = express();
app.use(express.json());
app.use(cors());

// app.use('/api', (req, res) => {
//     return res.json({
//         hello: "Tung"
//     })
// })

app.use('/api/admin', mangaRouterAdmin)
app.use('/api/admin', uploadChapterImagesRouter)

app.use('/api', mangaRouter)
app.use('/api', typeRouter)
app.use('/api', chapterRouter)

const runningServer = (port) => {
    app.listen(port, () => {
        console.log(`Server Running on http://localhost:${port}`);
    })
}

connectMongoose(() => {
    runningServer(process.env.PORT);
})

