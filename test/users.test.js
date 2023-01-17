import request from "supertest"
import assert from "assert"


const URL = 'http://127.0.0.1:3000/api'

describe('POST /users', function () {
    it('responds with json', function (done) {
        request(URL)
            .post('/users')
            .send({ name: 'john', userName: "john", age: 80, hobbies: ["read book", "sports"] })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'json; charset=utf-8')
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
    it('responds with json', function (done) {
        request(URL)
            .post('/users')
            .send({ name: 'john1', userName: "john1", age: 81, hobbies: ["read book", "sports"] })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'json; charset=utf-8')
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
    it('responds with json', function (done) {
        request(URL)
            .post('/users')
            .send({ name: 'john14', userName: "john14", age: 89, hobbies: ["read book", "sports"] })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'json; charset=utf-8')
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
    it('responds with json', function (done) {
        request(URL)
            .post('/users')
            .send({ name: 'john', age: 80, hobbies: ["read book", "sports"] })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'json; charset=utf-8')
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

});

describe('GET /users', function () {
    let users = []
    it('Get users', function (done) {
        request(URL)
            .get('/users')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

});
describe('GET /users/{id}', function () {

    it('bad id', function (done) {
        request(URL)
            .get('/users/6585')
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
    it('user not found', function (done) {
        request(URL)
            .get('/users/be8abf2a-722b-4ab7-9410-d45f70025058')
            .expect(404)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
    it('Get user by id', function (done) {
        request(URL)
            .get('/users')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                let users = JSON.parse(res.text)
                let user = users[Math.floor(Math.random() * (users.length - 1))]
                if (users) {
                    request(URL)
                        .get(`/users/${user.id}`)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) return done(err);
                            return done();
                        });
                }
            });
    });

});


describe('Delete /users/{id}', function () {

    it('bad id', function (done) {
        request(URL)
            .delete('/users/6585')
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
    it('user not found', function (done) {
        request(URL)
            .delete('/users/be8abf2a-722b-4ab7-9410-d45f70025058')
            .expect(404)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });


    it('Delete user status 204', async function () {
        let user = (await getUsers())[0]
        const response = await request(URL)
            .delete(`/users/${user.id}`)
            .set('Accept', 'application/json')
            .expect(204)


    });


});


describe('Update /users/', function () {

    it('bad id', function (done) {
        request(URL)
            .put('/users')
            .send({ id: "sdfsdf", name: 'john', userName: "john", age: 80, hobbies: ["read book", "sports"] })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'json; charset=utf-8')
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
    it('user not found', function (done) {
        request(URL)
            .put('/users/be8abf2a-722b-4ab7-9410-d45f70025058')
            .send({ id: 'be8abf2a-722b-4ab7-9410-d45f70025058', name: 'Ibvajjjj', userName: "john5656", age: 90, hobbies: ["read book", "sports", 'sleep'] })
            .expect(404)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });


    it('Delete user status 204', async function () {
        let user = (await getUsers())[0]
        console.log(user)
        const response = await request(URL)
            .put(`/users/${user.id}`)
            .set('Accept', 'application/json')
            .send({ id: user.id, name: 'Ibvajjjj', userName: "john5656", age: 90, hobbies: ["read book", "sports", 'sleep'] })
            .expect(200)
    });


});


async function getUsers() {
    let req = await request(URL).get('/users')
    return JSON.parse(req.text);

}