import Featured from '../../components/featured/Featured'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import PropertyList from '../../components/propertyList/PropertyList'

import './home.css'
import FeaturedProprty from '../../components/featuredProprty/FeaturedProprty'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="propertyListTitle">Property List hotels</h1>
        <PropertyList />
        <h1 className="propertyListTitle">Featured properties</h1>
        <FeaturedProprty/>
        <MailList/>

      <Footer/>
      </div>
    </div>
  )
}

export default Home