var UserModel = require('../models/userModel');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

    /**
     * UserController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }

            return res.json(Users);
        });
    },
    byLength: function (req, res) {
        UserModel.find(function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }

            return res.json(Users);
        })
        .$where(function(){return this.FirstName.length == this.LastName.length})
    },

    /**
     * UserController.show()
     */

    show: function (req, res) {
        var email = req.params.email;
        var password = req.params.password;

        UserModel.findOne({Email: email, Password:password}, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }

            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            return res.json(User);
        }).populate({path:'ordersUser', select:'_id Products OrderSum OrderDate UserId'});
    },
    
    /**
     * UserController.create()
     */
    create: function (req, res) {
        console.log("in create!!");
        var User = new UserModel({
			FirstName : req.body.firstName,
			LastName : req.body.lastName,
			Email : req.body.email,
			Password : req.body.password
        });

        User.save(function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating User',
                    error: err
                });
            }

            return res.status(201).json(User);
        });
    },

    /**
     * UserController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User',
                    error: err
                });
            }

            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            User.FirstName = req.body.FirstName ? req.body.FirstName : User.FirstName;
			User.LastName = req.body.LastName ? req.body.LastName : User.LastName;
			User.Email = req.body.Email ? req.body.Email : User.Email;
			User.Password = req.body.Password ? req.body.Password : User.Password;
			
            User.save(function (err, User) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating User.',
                        error: err
                    });
                }

                return res.json(User);
            });
        });
    },

    /**
     * UserController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the User.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
