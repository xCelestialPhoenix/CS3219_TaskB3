class User {

    constructor(data) {
       this.firstname = data.firstname;
       this.lastname = data.lastname;
       this.username = data.username;
       this.password = data.password;
       this.mobile = data.mobile;
    }
 
    addUser() {
       return `INSERT INTO users(firstname, lastname, username, password, mobile) \
                    VALUES('${this.firstname}','${this.lastname}', '${this.username}', '${this.password}', '${this.mobile}')`;
    }
 
    updateUser(username) {
       return `UPDATE users SET firstname = '${this.firstname}', lastname = '${this.lastname}',
        password = '${this.password}', mobile = '${this.mobile}' WHERE username = ${username}`;
    }
 
    static getUserByUsername(username) {
       return `SELECT * FROM users WHERE username = ${username}`;
    }
 
    static deleteUserByUsername(username) {
       return `DELETE FROM users WHERE username = ${username}`;
    }
 
    static getAllUsers() {
       return `SELECT * FROM users`;
    }
 }
 
 module.exports = User;