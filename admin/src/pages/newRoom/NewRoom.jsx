import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { hotelInputs, roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch"; 
import { roomColumns } from "../../datatablesource";

const NewRoom = () => {
  const [hotelId, setHotelId] = useState(undefined)
  const [info, setInfo] = useState({});
  const [room, setRoom] = useState({});

  const {data ,loading} = useFetch("/hotel") 

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  

const handlClick = async (e) => {
  e.preventDefault();
  try {
  const roomNumber = room.split(",").map((room)=> ({number:room}))
  axios.post(`/room/${hotelId}`,{...info, roomNumbers: roomNumber})
  } catch (error) {
    console.log({"roomError": error})
  }

}
console.log({hotelId})
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Room</h1>
        </div>
        <div className="bottom"> 
          <div className="right">
            <form> 

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} id={input.id} onChange={handleChange}/>
                </div>
              ))}
              <div className="formInput">
                  <label>Room</label>
                  <textarea placeholder="given room number separete by comma" onChange={(e) => setRoom(e.target.value)}/>
              </div>
              <div className="formSelect">
                  <label>Choose a hotel</label>
                  <select id="room" onChange={(e) => setHotelId(e.target.value)}>
                    {
                      loading? "Loading...": data && data.map((room) => (
                        <option key={room._id} value={room._id}>{room.name}</option> 
                      ))
                    }
                  </select>
              </div>
              <button type="submit" onClick={handlClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
