var CategoryModel = require('../models/CategoryModel.js');

/**
 * CategoryController.js
 *
 * @description :: Server-side logic for managing Categorys.
 */
module.exports = {

    /**
     * CategoryController.list()
     */
    list: function (req, res) {
        CategoryModel.find(function (err, Categorys) {
            if (err) {
                console.log("kk");
                return res.status(500).json({
                    message: 'Error when getting Category.',
                    error: err
                });
            }

            return res.json(Categorys);
        });
    },
    // maxCategory: function (req, res) {
    //     CategoryModel.find(function (err, Categorys) {
    //         if (err) {
    //             return res.status(500).json({
    //                 message: 'Error when getting Category.',
    //                 error: err
    //             });
    //         }

    //         return res.json(Categorys);
    //     })
    //     .sort({Pr:-1})
    //     .limit(1);
    // },
    /**
     * CategoryController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CategoryModel.findOne({_id: id}, function (err, Category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Category.',
                    error: err
                });
            }

            if (!Category) {
                return res.status(404).json({
                    message: 'No such Category'
                });
            }

            return res.json(Category);
        });
    },

    /**
     * CategoryController.create()
     */
    create: function (req, res) {
        var Category = new CategoryModel({
			CategoryName : req.body.categoryName,
			return : req.body.return
        });

        Category.save(function (err, Category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Category',
                    error: err
                });
            }

            return res.status(201).json(Category);
        });
    },

    /**
     * CategoryController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        CategoryModel.findOne({_id: id}, function (err, Category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Category',
                    error: err
                });
            }

            if (!Category) {
                return res.status(404).json({
                    message: 'No such Category'
                });
            }

            Category.CategoryName = req.body.CategoryName ? req.body.CategoryName : Category.CategoryName;
			Category.return = req.body.return ? req.body.return : Category.return;
			
            Category.save(function (err, Category) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Category.',
                        error: err
                    });
                }

                return res.json(Category);
            });
        });
    },

    /**
     * CategoryController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CategoryModel.findByIdAndRemove(id, function (err, Category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Category.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
