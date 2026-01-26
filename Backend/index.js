const http = require("http")
const host = "localhost"
const port = 8000

const requestListener = (req, res) => {
    res.writeHead(200)
    res.end("Entschuldigung!")
}
const server = http.createServer(requestListener)

server.listen(port, host, () => {
    console.log("server is running at " + host)
})