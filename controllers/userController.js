const db = require("../database/mySqlDb");
const User = require("../models/user");

// Handles getting all users in the database 
exports.viewAllUser = function (request, response) {
    db.query(User.getAllUsers(), (error, result) => {
        if (error) {
            response.status(400).json({
                "status": "error",
                "message": error,
           })
        } else {
            response.status(200).json({
                "status": "success",
                "data": result,
             })
        }
    });
};

// Handles getting one user in the database
exports.viewUser = function (request, response) {
    const username = '"' + request.params.username + '"';
    db.query(User.getUserByUsername(username), (error, result) => {
        if(error) {
            response.status(404).json({
                'error': error.message,
            });
        } else if(result.length === 0) {
            response.status(404).json({
                'error': "User not found."
            });
        } else {
            response.status(200).json({
                'data': result,
            });
        }
    })
};

// Handles create user
exports.addUser = function (request, response) {

    const user = new User(request.body);

    // Save the user
    db.query(user.addUser(), (error, result) => {
        // Check for error
        if (error) {
            response.status(400).json({
                "status": "error",
                "message": error,
            })
        } else {
            response.status(200).json({
                "status": "success",
                "data": result,
            })
        }
    });
};

// Handles updating user
exports.updateUser = function (request, response) {
   
    const user = new User(request.body);
    const username = '"' + request.params.username + '"';
    db.query(user.updateUser(username), (error, result) => {
        if(error) {
            response.status(400).json({
                'error': error.message,
            });
        } else {
            db.query(User.getUserByUsername(username), (error, userData) => {
                if (error) {
                    response.status(400).json({
                        'error': error.message,
                    });
                } else {
                    response.status(200).json({
                        'message': 'User updated successfully.',
                        'data': userData,
                    });
                }
            });
        }
    });
};

// Handles deleting user
exports.deleteUser = function (request, response) {
    const username = '"' + request.params.username + '"';
    db.query(User.deleteUserByUsername(username), (error, userData) => {
        if (error) {
            response.status(404).json({
                'error': error.message,
            });
        } else {
            response.status(200).json({
                'message': 'User deleted successfully.',
                'data': userData,
            });
        }
    })
};