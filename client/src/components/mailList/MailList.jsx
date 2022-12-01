import './mailList.css'

const MailList = () => {
  return (
    <div className='mailList'>
        <div className="mailLstIntro">
            <h1 className="mailListTitle">Save time , Save mony</h1>
            <div className="mailListSubtitle">sign up and we'll send  the best deal to you</div>
        </div>
        <div className="mailListInput">
            <input type="text"  placeholder='Your  Email'/>
            <button>Subscribe</button>
        </div>
        <div className="mailListCheckox">
            <input type="checkbox" id='check'  />
            <label htmlFor="check">send me a link to to get the  FREE  booking.com app!</label>
        </div>
    </div>
  )
}

export default MailList