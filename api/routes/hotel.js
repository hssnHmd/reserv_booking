import express from 'express'
import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'
import { verifyIsAdmin } from '../verifyToken.js'

const router = express.Router()


router.post('/', verifyIsAdmin, async (req, res) => {

    try {
        const newHotel = new Hotel(req.body)
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})


// update 

router.put('/:id',verifyIsAdmin, async (req, res) => { 
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete 

router.delete('/:id', verifyIsAdmin, async (req, res) => { 
    try {
         await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("an hotel has been deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})
// get one 

router.get('/find/:id', async (req, res) => { 
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get All

router.get('/', async (req, res, next) => { 
    const { minn, maxx, ...rest } = req.query;
    try {
      const hotels = await Hotel.find({
        ...rest, cheapestPrice :{$gt: minn||1, $lt:maxx||9999 } 
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
})

router.get("/countByCity", async (req, res, next) => {
        const cities = req.query.cities.split(",")
        try {
            const list = await Promise.all(cities.map((city) => {
                return Hotel.countDocuments({city: city})
            }))
            res.status(200).json(list)
        } catch (error) {
            next(error)
        }
    }
)
router.get("/countByType", async (req, res, next) => { 
    try {
        const hotelCount = await  Hotel.countDocuments({type:"hotel"})
        const appartmentCount = await  Hotel.countDocuments({type:"appartment"})
        const resortCount = await  Hotel.countDocuments({type:"resorts"})
        const villaCount = await  Hotel.countDocuments({type:"villa"})
        const cabinCount = await  Hotel.countDocuments({type:"cabin"})
        res.status(200).json([
            {type:"hotel", count:hotelCount},
            {type:"appartment", count:appartmentCount},
            {type:"resorts", count:resortCount},
            {type:"villa", count:villaCount},
            {type:"cabin", count:cabinCount},
        ])
    } catch (error) {
        next(error)
    }
}
)

router.get("/room/:id", async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
    }
)

export default router