import http from "http"
import url from "url";
import { User } from "./src/user.js";
import { validate as uuidValidate } from 'uuid'
import dotenv from 'dotenv'
dotenv.config()
const hostname = "127.0.0.1";
const port = process.env.PORT || 5000;
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
    if (urlRequest === '/api/users') {
        switch (method) {
            case 'POST':
                req.on('data', (data) => {
                    try {
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
                        if (user) {
                            res.statusCode = 200
                            res.setHeader("Content-Type", "json; charset=utf-8")
                            res.end(JSON.stringify(user))
                        }
                        else {
                            res.statusCode = 404
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
            case "PUT":
                req.on('data', (data) => {
                    let userUpdate = JSON.parse(data.toString())
                    let update = User.updateUser(userUpdate)
                    console.log(update)
                    res.setHeader("Content-Type", "json; charset=utf-8");
                    res.statusCode = update.status
                    res.end(update.message);
                })
                break;
            case "DELETE":
                let remove = User.removeUser(parameter)
                res.statusCode = remove.status
                res.setHeader("Content-Type", "json; charset=utf-8")
                res.end(remove.message)
                break
            default:
                res.statusCode = 404;
                res.end("Page not found")
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