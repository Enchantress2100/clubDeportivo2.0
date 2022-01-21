const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require('../index')
chai.use(chaiHttp)
describe("probando API REST con Mocha-Chai", function () {
    it('Probando que la ruta /deportes devuelve un json con la propiedad deportes y esta debe ser un arreglo', function () {
        chai.request(server)
            .get('/deportes')
            .end(function (err, res) {
                let data = JSON.parse(res.text)
                chai.expect(data).to.have.property("deportes")
                chai.expect(data.deportes).to.be.an("array")
        })
    })
})