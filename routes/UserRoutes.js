var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController.js');

/*
 * GET
 */
router.get('/', UserController.list);
router.get('/byLength', UserController.byLength);


/*
 * GET
 */
router.get('/:email/:password', UserController.show);

/*
 * POST
 */
router.post('/', UserController.create);

/*
 * PUT
 */
router.put('/:id', UserController.update);

/*
 * DELETE
 */
router.delete('/:id', UserController.remove);

module.exports = router;
