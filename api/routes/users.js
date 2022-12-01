import express from 'express'
import User from '../models/User.js'
import { verifyIsAdmin, verifyToken, verifyUSer } from '../verifyToken.js'

const router = express.Router()

// router.get('/checkAuth',verifyToken, (req, res, next) => {

//     res.send("Ok your in")

// })


// router.get('/checkUser/:id',verifyUSer, (req, res, next) => {

//   res.send("you can delete your account")

// })

router.get('/checkAdmin/:id',verifyIsAdmin, (req, res, next) => {
    res.send("you can delete your All  account")
})

// update 

router.put('/:id',verifyUSer, async (req, res) => { 
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete 

router.delete('/:id',verifyUSer, async (req, res) => { 
    try {
         await User.findByIdAndDelete(req.params.id)
        res.status(200).json("a user has been deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})
// get one 

router.get('/:id',verifyUSer, async (req, res) => { 
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get All

router.get('/', verifyIsAdmin, async (req, res, next) => { 
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
})
export default router