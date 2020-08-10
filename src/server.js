//Server
const express = require('express');
const server = express();

const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

//Set nunjuncks (template engine)
const nunjucks = require('nunjucks');
const format = require('./utils/format')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//Start server configuration
server
//Receber os dados do req.body
.use(express.urlencoded({extended:true}))
//Set static archiver
.use(express.static("public"))
//Application routes
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
//Start server
.listen(5500)

//Note: () => {} is a function.
//Note: (requisiton(will get more data), response) => {what will returned}

// __dirname = local of program archives
// use = server configuration.
// express.static -> static refires the archives that never change (in case, all css and html scripts)