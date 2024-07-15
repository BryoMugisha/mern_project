import express from 'express'
const router = express.Router();


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})  
})

export { router as UserRouter};