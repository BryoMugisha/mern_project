import express from 'express'
import { Register, Login, Auth } from '../controller/userController.js'
const router = express.Router()
import { body } from 'express-validator'
import { VerifyUser } from '../middleware/VerifyUser.js'
import { createPatient, getPatients, getPatient, updatePatient, deletePatient } from '../controller/patientController.js'


// user routes
router.post('/register', [
    body("name").trim().notEmpty().withMessage("Name should Not be Empty"),
    body('email').trim().notEmpty().withMessage("Email should Not be Empty")
        .isEmail().withMessage("Invalid Email!!"),
    body('password').trim().notEmpty().withMessage("Password should Not be empty")
        .isLength({ min: 5, max: 30 }).withMessage("Password Length be 5-30")
], Register)


router.post('/login', [
    body('email').trim().notEmpty().withMessage("Email should Not be Empty")
        .isEmail().withMessage("Invalid Email!!"),
    body('password').trim().notEmpty().withMessage("Password should Not be empty")
        .isLength({ min: 5, max: 30 }).withMessage("Password Length be 5-30")
], Login)


router.get('/verify', VerifyUser, Auth)

//patient routes  
router.post('/add-patient', VerifyUser, createPatient)
router.get('/patients', VerifyUser, getPatients)
router.get('/patient/:id', VerifyUser, getPatient)
router.put('/update-patient/:id', VerifyUser, updatePatient)
router.delete('/patient/:id', VerifyUser, deletePatient)



export { router as Router }