import useFetch from '../../hooks/useFetch'
import './featuredProprty.css'

const FeaturedProprty = () => {
    const {data, error, loading} = useFetch('/hotel?featured=true&limit=3')
    console.log({feaytured: data})

  return (
    <div className='featuredProprty'>
        {
            loading ? "Loading..." :
            <>
                {
                    data.map((item) => (
                        <div className="featuredProprtyItem" key={item._id}>
                            <img  
                                src={item.photos[0] ? item.photos[0] : "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"}
                                alt=""
                                />
                            <div className="featuredProprtyInfo">
                                <h1 className='featuredProprtyTitle1'>{item.name}</h1>
                                <h2>{item.city}</h2>
                                <span className='featuredProprtyTitle2'>Starting from ${item.cheapestPrice}</span>
                                <div className="featuredProprtyreview">
                                    <button>{item.rating}</button>
                                    <span>{item.desc}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </> 
        }
         
    </div>
  )
}

export default FeaturedProprty