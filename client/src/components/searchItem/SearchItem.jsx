import { Link } from 'react-router-dom'
import './searchItem.css'

const SearchItem = ({item}) => {
  return (
    <div className="listResult">
        <div className="listResultItem">
                <div className="listResultItemImg">
                    <img 
                    src={item.photos[0]? item.photos[0]: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1" }
                    alt="" 
                    /> 
                </div>
                <div className="listResultInfo">
                    <div className="listResultTop">
                        <h1>{item.name}</h1>
                        <span>{item.desc}</span>
                        {
                            item.rating && <button>{item.rating}</button>
                        }
                        
                    </div>
                    <div className="listResultCenter">
                        <span>{item.distance}</span>
                        <span className='listResultTaxi'>Free airport taxi</span>
                        <p>Studio Apartment with Air conditioning</p>
                        <div className='listResultCenterInfo'>
                            <span> Entire studio . 1 barhrom .21m 1 full bed</span>
                            <span>${item.cheapestPrice}</span>
                        </div>
                        <div className='listResultCenterConcelation'> 
                            <h3>Free concellation</h3>
                            <span>Includes taxes</span>
                        </div>
                        <div className='listResultCenterAbility'>
                            <span>You can cancel later, so lock this graet price today</span>
                            <Link to={`/hotel/${item._id}`}>
                                <button>See availability</button>
                            </Link>
                        </div>
                    </div>
                </div>
        </div> 
    </div>
  )
}

export default SearchItem