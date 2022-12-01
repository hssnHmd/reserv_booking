import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { SearchContext } from '../../context/searchContext'
import useFetch from '../../hooks/useFetch'
import './reserve.css'

const Reserve = ({setOpenModal, hotelId}) => {
    const [selectRooms, setSelectRooms] = useState([])
    const {data, loading} = useFetch(`/hotel/room/${hotelId}`)
    
    const {date} = useContext(SearchContext)

    const getTimeInRange = (startDate, endDate) =>{
        const start = new Date(startDate)
        const end = new Date(endDate)
        const dte = new Date(start.getTime())
        let list = []
        while(dte <= end){
            list.push(new Date(dte).getTime())
            dte.setDate(dte.getDate() +1)
        }
        return list
    }
   const allDates = getTimeInRange(date[0].startDate, date[0].endDate)

   const isAvailable = (roomNumber) => {
    const isFound = roomNumber.invailableDate.some((date) => 
        allDates.includes(new Date(date).getTime())
    )
    return !isFound
   }

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectRooms(checked ? [...selectRooms, value] : selectRooms.filter(item => item !== value))
    }
    const handleClick = async () => {
        try {
            await Promise.all(
                selectRooms.map(romId => {
                    const res =  axios.put(`/room/availability/${romId}`, {date: allDates})
                    return res.data
                })
                )
                setOpenModal(false)
        } catch (error) {
            
        }
    }
  return (
    <div className='reserve'>
        <div className="rContainer">
            <FontAwesomeIcon 
                icon={faCircleXmark}
                className="rClose"
                onClick={()=> {}}
            />
            <span>Select your Room :</span>
            {
                data.map((item) => (
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rItemTitle">{item.title}</div>
                            <div className="rItemDesc">{item.desc}</div>
                            <div className="rItemMaxPoeple">Max poeple: <b>{item.maxPoeple}</b></div>
                            <div className="rItemPrice">Price: <b>{item.price}</b></div>
                        </div>
                        <div className="rSelectRoom">
                            {
                                item.roomNumbers.map(roomNumber => (
                                    <div className="rRoom">
                                        <label htmlFor="">{roomNumber?.number}</label>
                                        <input 
                                            type="checkbox" 
                                            value={roomNumber?._id} 
                                            onChange={handleSelect} 
                                            disabled={!isAvailable(roomNumber)}                            
                                        />
                                    </div>
                                )
                                    )
                            }
                        </div>
                    </div>
                ))
            }
            <button className='rBtn' onClick={handleClick}>Reserve now</button>
        </div>
    </div>
  )
}

export default Reserve