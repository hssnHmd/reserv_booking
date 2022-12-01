import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendar, faCar, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'
import { format } from 'date-fns';
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { SearchContext } from '../../context/searchContext';
import { AuthContext } from '../../context/authContext';

const Header = ({type}) => {
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }])

    const [toggleDate, setToggleDate] = useState(false)
    const [toggleoptions, setToggleOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 0
    })
    const [destination, setDestination] = useState("")
    const navigate = useNavigate()
    const handlOption = (type, action)=> {
        setOptions((prev) => {
            return {
                ...prev, [type]: action === 'i' ? options[type] +1 : options[type] - 1
            }
        })
    }
    const {dispatch} = useContext(SearchContext)
    const {user} = useContext(AuthContext)

    const  handleSearch = ()=> {
        dispatch({type: "NEW_SEARCH", payload:{date, destination, options}})
        navigate('/hotels', {state: {destination, date, options}})
    }
    
  return (
    <div className='header'>
        <div className={ type === 'list' ? 'headerContainer listmode' : "headerContainer"} >
            <div className="headerList">
                <div className="headerListItems active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rentals</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxi</span>
                </div>
            </div>
            {
                type !== 'list' &&
                <>
                    <h1 className='headerTitle'>A liftime of dsicount? it's Genuis</h1>
                    <p className="headerDesc">
                    ratione magni itaque maxime. Blanditiis eaque voluptate voluptatem magni, neque placeat!
                    </p>
                    {
                        !user &&<button className='headerBtn'>Signin / register</button>
                    }
                    
                    <div className="headerSearch">
                        <div className="searchItem">
                            <FontAwesomeIcon icon={faBed} className='headerIcon'/>
                            <input type="text" placeholder='Where are you goind?' className='searchInput' onChange={(e) => setDestination(e.target.value)} />
                        </div>
                        <div className="searchItem">
                            <FontAwesomeIcon icon={faCalendar} className='headerIcon'/>
                            <span className="searchText" onClick={()=>  setToggleDate(!toggleDate)}> {`${format(date[0].startDate, "dd/mm/yyyy")} to ${format(date[0].endDate, "dd/mm/yyyy")} `}</span>
                            {
                                toggleDate && 
                                    <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className='dateRange' 
                                />}
                            
                        </div>
                        <div className="searchItem">
                            <FontAwesomeIcon icon={faBed} className='headerIcon'/>       
                            <span className="searchText" onClick={()=> setToggleOptions(!toggleoptions)}>{`${options.adult} adults ${options.children} childrens ${options.room} room`}</span>
                        { toggleoptions && 
                                <div className="options">
                                    <div className="optionsItem">
                                        <div className="optionText">Adult</div>
                                        <div className="optionCounter">
                                            <button className="counterBtn" onClick={() => handlOption('adult', 'd')} disabled={options.adult <= 1}>-</button>
                                            <span className="optionCounterNumber">{options.adult}</span>
                                            <button className="counterBtn" onClick={() => handlOption('adult', 'i')}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionsItem">
                                        <div className="optionText">Children</div>
                                        <div className="optionCounter">
                                            <button className="counterBtn" onClick={() => handlOption('children', 'd')} disabled={options.children <= 1}>-</button>
                                            <span className="optionCounterNumber">{options.children}</span>
                                            <button className="counterBtn" onClick={() => handlOption('children', 'i')}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionsItem">
                                        <div className="optionText">Room</div>
                                        <div className="optionCounter">
                                            <button className="counterBtn" onClick={() => handlOption('room', 'd')} disabled={options.room <= 1}>-</button>
                                            <span className="optionCounterNumber">{options.room}</span>
                                            <button className="counterBtn" onClick={() => handlOption('room', 'i')}>+</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="searchItem"> 
                            <button className='searchItemBtn' onClick={handleSearch}>Search</button>                 
                        </div>
                    </div>
                    </>
            }
        </div>
    </div>
  )
}

export default Header