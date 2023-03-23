const router = require('express').Router()
const doctorCtrl = require('../controllers/doctorCtrl')

router.route('/doctors')
.get(doctorCtrl.getDoctors)
.post(doctorCtrl.createDoctor)


router.route('/doctors/:id')
  .delete(doctorCtrl.deleteDoctor)
  .put(doctorCtrl.updateDoctor)







module.exports = router;