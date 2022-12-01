import jwt from 'jsonwebtoken'
import { createError } from './utils.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if(!token) return next(createError(401, "You are not authenticated!"))
    jwt.verify(token , process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return next(createError(403, "token not valid")) 
        req.user = user
        next()
    })
}

export const verifyUSer =  (req, res, next) => {
    verifyToken(req, res,next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else {
          return next(createError(403, "you are not allowed to access this !")) 
        }
    }) 
}

export const verifyIsAdmin =  (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin){
            next()
        }else {
          if (err) return next(createError(403, "you are not allowed to access this !")) 
        }
    }) 
}