import request from "supertest"

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
            .send({ name: 'john', age: 80 })
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
                users = JSON.parse(res.text)
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
    it('user not found', function (done) {
        const res = request(URL)
            .get('/users');
        console.log(res.body)
    });

});

