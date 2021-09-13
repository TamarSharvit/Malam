var OrdersModel = require('../models/OrdersModel.js');

/**
 * OrdersController.js
 *
 * @description :: Server-side logic for managing Orderss.
 */
module.exports = {

    /**
     * OrdersController.list()
     */
    list: function (req, res) {
        OrdersModel.find(function (err, Orderss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Orders.',
                    error: err
                });
            }

            return res.json(Orderss);
        });
    },

    maxOrder: function (req, res) {
        OrdersModel
        .find(function (err, Orderss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Orders.',
                    error: err
                });
            }

            return res.json(Orderss);
        })
        .sort({OrderSum:-1})
        .limit(1);
    },

    /**
     * OrdersController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        OrdersModel.findOne({_id: id}, function (err, Orders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Orders.',
                    error: err
                });
            }

            if (!Orders) {
                return res.status(404).json({
                    message: 'No such Orders'
                });
            }

            return res.json(Orders);
        });
    },

    /**
     * OrdersController.create()
     */
    create: function (req, res) {
        var Orders = new OrdersModel({
            Products : req.body.Products,
            UserId : req.body.UserId,	
            OrderSum : req.body.OrderSum,
			OrderDate : req.body.OrderDate,
		
			
			
        });

        Orders.save(function (err, Orders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Orders',
                    error: err
                });
            }

            return res.status(201).json(Orders);
        });
    },

    /**
     * OrdersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        OrdersModel.findOne({_id: id}, function (err, Orders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Orders',
                    error: err
                });
            }

            if (!Orders) {
                return res.status(404).json({
                    message: 'No such Orders'
                });
            }

            Orders.OrderDate = req.body.OrderDate ? req.body.OrderDate : Orders.OrderDate;
			Orders.OrderSum = req.body.OrderSum ? req.body.OrderSum : Orders.OrderSum;
			Orders.Products = req.body.Products ? req.body.Products : Orders.Products;
			Orders.UserId = req.body.UserId ? req.body.UserId : Orders.UserId;
			
            Orders.save(function (err, Orders) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Orders.',
                        error: err
                    });
                }

                return res.json(Orders);
            });
        });
    },

    /**
     * OrdersController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        OrdersModel.findByIdAndRemove(id, function (err, Orders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Orders.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
