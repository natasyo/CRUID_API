import request from "supertest"

const URL = 'http://127.0.0.1:3000'

describe('POST /users', function () {
    it('responds with json', function (done) {
        request(URL)
            .post('/users')
            .send({ name: 'john', userName: "john", age: 80 })
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
            .send({ name: 'john1', userName: "john1", age: 81 })
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
    it('responds with json', function (done) {
        request(URL)
            .get('/users')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log(res.text)
                return done();
            });
    });

});

