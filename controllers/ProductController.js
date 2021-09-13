const { ObjectID } = require('mongodb');
var ProductModel = require('../models/ProductModel.js');

/**
 * ProductController.js
 *
 * @description :: Server-side logic for managing Products.
 */
module.exports = {

    /**
     * ProductController.list()
     */
    list: function (req, res) {
        ProductModel.find(function (err, Products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }

            return res.json(Products);
        });
    },

    /**
     * ProductController.show()
     */
    // show: function (req, res) {
    //     var id = req.params.id;

    //     ProductModel.findOne({_id: id}, function (err, Product) {
    //         if (err) {
    //             return res.status(500).json({
    //                 message: 'Error when getting Product.',
    //                 error: err
    //             });
    //         }

    //         if (!Product) {
    //             return res.status(404).json({
    //                 message: 'No such Product'
    //             });
    //         }

    //         return res.json(Product);
    //     });
    // },



    // var query = { categoryId: id };
    // dbo.collection("products").find(query).toArray(function(err, result) {
  
  


    show: function (req, res) {
        
        var Cid = req.params.CategoryId;
        ProductModel.find({CategoryId: Cid}, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting product.',
                    error: er
                });
            }

            if (!Product) {
                return res.status(404).json({
                    message: 'No such product'
                });
            }

            return res.json(Product);
        });
    },

    /**
     * ProductController.create()
     */
    create: function (req, res) {
        var Product = new ProductModel({
			ProductName : req.body.productName,
			ProductPrice : req.body.productPrice,
			CategoryId : req.body.categoryId,
			ProductImage : req.body.productImage,
			Description : req.body.description
        });

        Product.save(function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Product',
                    error: err
                });
            }

            return res.status(201).json(Product);
        });
    },

    /**
     * ProductController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ProductModel.findOne({_id: id}, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product',
                    error: err
                });
            }

            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }

            Product.ProductName = req.body.ProductName ? req.body.ProductName : Product.ProductName;
			Product.ProductPrice = req.body.ProductPrice ? req.body.ProductPrice : Product.ProductPrice;
			Product.CategoryId = req.body.CategoryId ? req.body.CategoryId : Product.CategoryId;
			Product.ProductImage = req.body.ProductImage ? req.body.ProductImage : Product.ProductImage;
			Product.Description = req.body.Description ? req.body.Description : Product.Description;
			
            Product.save(function (err, Product) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Product.',
                        error: err
                    });
                }

                return res.json(Product);
            });
        });
    },

    /**
     * ProductController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ProductModel.findByIdAndRemove(id, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Product.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    getByCaterogy: function(req, res){ 
        var id = req.params.id;
        ProductModel.findById(id, function(err, Product){
            if (err) {
                return res.status(500).json({
                    message: 'Error when search the categoryId.',
                    error: err
                });
            }

            return res.json(Product);
        });
        
    }
};
