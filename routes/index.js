const express = require('express');
const router = express.Router();
const Project = require('../models/country-model')
// to get all projects
router.get('/', (req, res) => {
  debugger
res.send('ok')
})


module.exports = router;