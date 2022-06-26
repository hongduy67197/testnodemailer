const express = require('express')
const app = express()
const path = require('path')
const port = 3120;
const Router = require('./router')
const cookie = require("cookie-parser");


app.set('view engine', 'ejs')
app.use('/views', express.static(path.join(__dirname, './views')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie())
app.use('/', Router)
app.listen(port, () => {
    console.log(`serve listen in localhost ${port}`);
})