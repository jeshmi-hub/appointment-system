const router = require('express').Router()
const doctorCategory = require('../controllers/doctorCategoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/doctorCategory')
.get(doctorCategory.getCategories)
.post(auth, authAdmin, doctorCategory.createCategory)

router.route('/category/:id')
.delete(auth,authAdmin, doctorCategory.deleteCategory)
.put(auth,authAdmin, doctorCategory.updateCategory)
module.exports = router