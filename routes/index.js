const express = require('express');
const router = express.Router();

// Server root route
router.get('/', (req,res,next) => {
    res.status(200).json({message: 'Welcome to our ShifterAPP server root !'});
})

module.exports = router;