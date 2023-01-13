import http from "http"
import { User } from "./src/user.js";


const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    let url = req.url

    switch (url) {
        case '/users':
            if (req.method === 'POST') {
                req.on('data', (data) => {
                    try {

                        console.log(User.users)
                        res.statusCode = User.addUser(JSON.parse(data.toString()))
                        res.setHeader("Content-Type", "json; charset=utf-8");
                        res.end("User created");
                    }
                    catch (e) {
                        console.log(e)
                    }
                })
            }
            if (req.method === 'GET') {
                res.statusCode = 200
                res.setHeader("Content-Type", "json; charset=utf-8")
                res.end(JSON.stringify(User.users))
            }

            break
        default:
            res.statusCode = 400;
            break
    }


});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
export { server };