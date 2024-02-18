const express = require('express');
const cors = require('cors');
require('dotenv').config()
const connectMongoose = require('./configs/mongoose');

const uploadImageRouter = require('./routers/admin/uploadImage');

const mangaRouterAdmin = require('./routers/admin/manga');
const chapterRouterAdmin = require('./routers/admin/chapter');
const imageRouterAdmin = require('./routers/admin/image');

const mangaRouter = require('./routers/client/manga');
const typeRouter = require('./routers/client/type');
const chapterRouter = require('./routers/client/chapter');
const imageRouter = require('./routers/client/image');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', uploadImageRouter)

app.use('/api/admin', mangaRouterAdmin)
app.use('/api/admin', chapterRouterAdmin)
app.use('/api/admin', imageRouterAdmin)

app.use('/api', mangaRouter)
app.use('/api', typeRouter)
app.use('/api', chapterRouter)
app.use('/api', imageRouter)

const runningServer = (port) => {
    app.listen(port, () => {
        console.log(`Server Running on http://localhost:${port}`);
    })
}

connectMongoose(() => {
    runningServer(process.env.PORT);
})

