const express = require("express");
const {
	registerController,
	loginController,
} = require("../controllers/userController");
const { signinController } = require("../controllers/signinController");
const { ProductUpload } = require("../middleware/multer.middleware");
const { getUsersController } = require("../controllers/getUsersController");

//router object
const router = express.Router();

//routes
router.post('/',ProductUpload.single('file'),signinController);
router.get('/users', getUsersController);

//export
module.exports = router;
