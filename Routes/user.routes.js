const express = require('express')
const router = express.Router()
const {Register, sigin, getDashboard} = require('../Controller/user.controller')

router.post('/register',Register)
router.post('/signin', sigin)
router.get('/dashboard', getDashboard)

module.exports= router 

