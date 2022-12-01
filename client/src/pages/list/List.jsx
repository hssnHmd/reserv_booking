import './list.css'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import SearchItem from '../../components/searchItem/SearchItem'
import { useState } from 'react'
import { DateRange } from 'react-date-range';
import { format } from 'date-fns' 
import { useLocation } from 'react-router-dom'

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'

import useFetch from '../../hooks/useFetch'

const List = () => {
  const location = useLocation()
  console.log(location)
  const [date, setDate] = useState(location.state?.date)
  const [options, setOptions] = useState(location.state?.options)
  const [destination, setDestination] = useState(location.state?.destination)
  const [toggleDate, setToggleDate] = useState(false)
  const [max, setMax] = useState(undefined)
  const [min, setMin] = useState(undefined)
  const {data, loading,reFetch, error} = useFetch(`/hotel?city=${destination}&min=${min || 0}&max=${max || 9999}`)
  const handlClick = () => {
    reFetch()
  }

  return (
    <>
      <Navbar/>
      <Header type='list'/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="listTitle">Search</div>
            <div className="listDestination">
              <h2>Destination</h2>
              <input type="text" placeholder={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="listDate">
              <h2>Check-in date</h2>
              <span onClick={()=>setToggleDate(!toggleDate)}> {`${format(date[0]?.startDate, "dd/mm/yyyy")} to ${format(date[0]?.endDate, "dd/mm/yyyy")} `}</span>
              {
                toggleDate &&(
                    <DateRange    
                      onChange={(item) => setDate([item.selection])}
                      ranges={date || ""}
                      minDate={new Date()} 
                    />                 
                ) 
              } 
            </div>
            <div className="listOption">
              <h2 className="listOptionTitle">Options</h2>
              <div className="listOptionItem">
                <span>Min price (per night)</span>
                <input type="number" onChange={(e) => setMin(e.target.value)}  />
              </div>
              <div className="listOptionItem">
                <span>Max price (per night)</span>
                <input type="number" onChange={(e) => setMax(e.target.value)} />
              </div>
              <div className="listOptionItem">
                <span>Adult</span>
                <input type="number" min={1} placeholder={options?.adult}/>
              </div>
              <div className="listOptionItem">
                <span>Children</span>
                <input type="number" min={1} placeholder={options?.children} />
              </div>
              <div className="listOptionItem">
                <span>Room</span>
                <input type="number" min={1} placeholder={options?.room} />
              </div>
            </div>
            <button onClick={handlClick}>Search</button>
          </div>
          {
            loading ? "loading ..." : 
              <div style={{display:"flex", flexDirection:"column", gap:"15px",  flex: "3"}}>
              {
                data.map((item) =>( 
                  <div>
                    <SearchItem key={item._id} item={item}/>   
                  </div>
                ))
              }
              
              </div>
          }
          
        </div>
      </div>
    </>
  )
}

export default List