const express = require('express')
const router = express.Router()
const {Register, sigin, getDashboard, sendEmail} = require('../Controller/user.controller')

router.post('/register',Register)
router.post('/signin', sigin)
router.get('/dashboard', getDashboard)
router.get('/sendemail', sendEmail)

module.exports= router 

