import http from "http"
import url from "url";
import { User } from "./src/user.js";
import { validate as uuidValidate } from 'uuid'


const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    let method = req.method
    let urlRequest = req.url
    let urlArr = req.url.split('/')
    let parameter;
    if (urlArr.length === 4) {
        parameter = urlArr[urlArr.length - 1]
        urlArr.splice(urlArr.length - 1)
        urlRequest = urlArr.join('/')
    }

    console.log(urlRequest, urlArr.length)
    if (urlRequest === '/api/users') {
        switch (method) {
            case 'POST':
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
                break;
            case 'GET':
                if (parameter) {
                    if (uuidValidate(parameter)) {
                        const user = User.getUser(parameter)
                        console.log(user)
                        if (user) {
                            res.statusCode = 200
                            res.setHeader("Content-Type", "json; charset=utf-8")
                            res.end(JSON.stringify(user))
                        }
                        else {
                            res.statusCode = 404
                            console.log('Eeeeeeeeeeeeeeeee')
                            res.end('User not found')
                        }

                    }
                    else {
                        res.statusCode = 400
                        // res.setHeader("Content-Type", "json; charset=utf-8")
                        res.end('Failed ID')
                    }

                }
                else {
                    res.statusCode = 200
                    res.setHeader("Content-Type", "json; charset=utf-8")
                    res.end(JSON.stringify(User.users))
                }

                break
            default:
                res.statusCode = 400;
                res.end("Bad")
                break
        }

    }
    else {
        res.statusCode = 400;
        res.end("Bad")
    }

});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
export { server };