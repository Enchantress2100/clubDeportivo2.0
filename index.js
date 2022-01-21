const url = require('url')
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const{ nombre, precio } = url.parse(req.url, true).query
  let deporte = { nombre, precio }; 
  let deportes = JSON.parse(fs.readFileSync("deportes.json", "utf-8"))
  let masDeportes = deportes.deportes //deportes.json.deportes
  
  if (req.url == "/") {
    res.setHeader("content-type", "text/html")
    fs.readFile("index.html", "utf-8", (err, data) => {
      res.end(data)
    })
  }

  //metodo get
  if (req.url.startsWith('/deportes') && req.method == "GET") {
    fs.readFile("deportes.json", "utf-8", (err, data) => {
      res.end(data)
    })
  }

  //metodo post
  if (req.url.startsWith('/agregar') && req.method == "POST") {
    req.on("data", (payload) => {
      body = JSON.parse(payload);
    })
    req.on("end", () => {
      deporte = {
        nombre: body.nombre,
        precio: body.precio,
      }
      masDeportes.push(deporte)
      fs.writeFileSync("deportes.json", JSON.stringify(deportes))
      res.end()
    })
  }

  //metodo put
  if (req.url.startsWith('/editar') && req.method == "PUT") {
    let body;
    req.on("data", (payload) => {
      body=JSON.parse(payload)
    })
    req.on("end", () => {
      deportes.deportes = masDeportes.map((b) => {
        if (b.nombre == body.nombre) {
          return body
        }
        return b
      })
      fs.writeFileSync("deportes.json", JSON.stringify(deportes))
      res.end()
    })
  }

//metodo delete
  if (req.url.startsWith('/eliminar') && req.method=="DELETE") {
    const { nombre } = url.parse(req.url, true).query
    deportes.deportes = masDeportes.filter((b) => b.nombre !== nombre)
    fs.writeFileSync("deportes.json", JSON.stringify(deportes))
    res.end()
  }
}).listen(3000,()=>console.log("servidor ON and working OK"))
module.exports = server;