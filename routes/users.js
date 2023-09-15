const router = require('express').Router();

const { getCurrentUser, updateProfile } = require('../controllers/users');
const { updateProfileValidation } = require('../middlewares/validation');

router.get('/me', getCurrentUser);

router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;
