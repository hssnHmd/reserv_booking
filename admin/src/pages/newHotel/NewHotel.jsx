import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch"; 

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [room, setRoom] = useState({});

  const {data ,loading} = useFetch("/room") 

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value)
    setRoom(value)
  } 

const handlClick = async (e) => {
  e.preventDefault();
  try {
    const list = await Promise.all(
      Object.values(files).map(
        async (file) => {
          const data = new FormData();
          data.append("file", file)
          data.append("upload_preset", "upload")
          const responseUrl = await axios.post("https://api.cloudinary.com/v1_1/dmolbzqot/image/upload", data)

          const {url} = responseUrl.data   
          return url  
      }))
      
      const newHotel = {
        ...info,
        room,
        photos: list
      }
      await axios.post("/hotel", newHotel)
  } catch (error) {
    console.log({"HotelError": error})
  }

}

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} id={input.id} onChange={handleChange}/>
                </div>
              ))}
              <div className="formInput">
                  <label>Featured</label>
                  <select onChange={handleChange}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="formSelect">
                  <label>Room</label>
                  <select id="room" multiple onChange={handleSelect}>
                    {
                      loading? "Loading...": data && data.map((room) => (
                        <option key={room._id} value={room._id}>{room.title}</option> 
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

export default NewHotel;
