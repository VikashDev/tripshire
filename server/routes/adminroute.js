// Load required packages
...
var AdminController = require('./controllers/admincontroller');

...

// Create endpoint handlers for /Admins
router.route('/Admins')
  .post(AdminController.postUsers)
  .get(AdminController.getUsers);
