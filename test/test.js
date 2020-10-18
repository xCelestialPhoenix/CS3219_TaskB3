// Imports
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const db = require('../database/mySqlDb');
const User = require("../models/user");
const users = require('./data/users').users;

// Configure chai
chai.use(chaiHttp);

describe("Users", function() {

    const newUser = {
        username: "jakedoe123",
        password: "12345678",
        firstname: "Jake",
        lastname: "Doe",
        mobile: 93456789

    }

    const modifiedUser = {
        username: "jakedoe123",
        password: "123456",
        firstname: "Jake",
        lastname: "Doe",
        mobile: 93456789

    }



    before(function(done) {
        var status = null;
        users.forEach(function(user) {
            db.query((new User(user)).addUser(), (error, result) => {
                // Check for error
                if (error) {
                    console.log("Error while populating database:");
                    console.log(error);
                    status = error;
                }
            });
        });
        done(status);
    });

    after(function(done) {
        const sql_drop_table = "DROP TABLE IF EXISTS users;"
        db.query(sql_drop_table, (error, result) => {
            // Check for error
            if (error) {
                console.log("Error while dropping table:");
                done(error);
            } else {
                const sql_create_table = "CREATE TABLE users ( username VARCHAR(255) PRIMARY KEY, password VARCHAR(255), \
                                            firstname VARCHAR(255), lastname VARCHAR(255), mobile INTEGER);";
                db.query(sql_create_table, (error, result) => {
                    // Check for error
                    if (error) {
                        console.log("Error while creating table:");
                        done(error);
                    } else {
                        done(null);
                    }
                });
            }
        });
    })

    describe("GET", () => {
        // Test to get all the user record
        it("should get all users record", function(done) {
            chai.request(app)
                .get('/api/user')
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('object');
                    done();
                });
        });
    });

    describe("POST", () => {
        // Test to add a new user
        it("should add a new user to the database", function(done) {

            chai.request(app)
                .post('/api/user')
                .send(newUser)
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('object');
                    done();
                });
        });
    });

    describe("PUT", () => {
        it("should update Jake Doe's records", function(done) {
            chai.request(app)
            .put('/api/user/' + newUser.username)
            .send(modifiedUser)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.a('object');
                done();
            });
        });
    });

    describe("DELETE", () => {
        it("should delete Jake Doe's entry", function(done) {
            chai.request(app)
            .delete('/api/user/' + modifiedUser.username)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.a('object');
                done();
            });
        });
    });
});