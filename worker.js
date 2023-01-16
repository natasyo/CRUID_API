'use strict';

import http from 'node:http';
import { Console } from 'node:console';

const BASE_PORT = 3000;

const pid = process.pid;
const id = parseInt(process.argv[2], 10);
const port = BASE_PORT + id - 1;
const user = { name: 'jura', age: 22, port };

const routing = {
    '/': 'welcome to homepage',
    '/user': user,
    '/user/name': () => user.name,
    '/user/age': () => user.age,
    '/user/port': () => user.port + 'ljkjklj',
};

const types = {
    object: JSON.stringify,
    string: (s) => s,
    number: (n) => n.toString(),
    undefined: () => 'not found',
    function: (fn, par, client) => JSON.stringify(fn(client, par)),
};
let num = 1;
console.log(process, '\n\n\n\n\n\n')
process.send()
console.log(`Worker: ${id}, pid: ${pid}, port: ${port}`);
http.createServer((req, res) => {
    console.log(req.url)
    if (req.url !== '/favicon.ico') console.log(num++)
    const data = routing[req.url];
    const type = typeof data;
    const serializer = types[type];
    res.setHeader('Process-Id', process.pid);
    res.end(serializer(data, req, res));
}).listen(port);

