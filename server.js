const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require ("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url:"https://i.pinimg.com/originals/99/80/27/99802779fe19f191c3397e88893d750b.jpg",
        name: "Melancia",
        role: "Fruta",
        description: 'A melancia é uma deliciosa <a href="https://www.tuasaude.com/beneficios-da-melancia/#:~:text=A%20melancia%20%C3%A9%20uma%20deliciosa,pele%20bem%20hidratada%20e%20jovem."target="_blank">fruta</a> com muita água, rica em potássio e magnésio, que faz dela um excelente diurético natural. Esta fruta apresenta efeitos benéficos no equilíbrio de líquidos, ajudando a prevenir a retenção de água e a promover uma pele bem hidratada e jovem',
        links: [
            { name: "Imagens", url: 'https://www.google.com/search?q=imagens+melancia&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjK6dqhutzqAhXCILkGHR0MCKMQ_AUoAXoECA0QAw&biw=1366&bih=625"target="_blank'},
            { name: "Receitas", url:'https://www.receiteria.com.br/receitas-com-melancia/"target="_blank'}
        ]
    }
    return res.render("about", {about})
})

server.get("/portifolio", function (req, res) {
    return res.render("portifolio", { items:videos })
})

server.get("/video", function (req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })
    if (!video){
        return res.send("Video not found!")
    }

    return res.render("video", { item:video})
})



server.listen(5000, function (){
    console.log ("server is running")
})