import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext)

    if(!user){
      return <Navigate to='/login'/>
    }
    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
            />
            <Route path="login" element={<Login />} />
            <Route path="user">
              <Route index element={
                <ProtectedRoute> 
                  <List  columns={userColumns}/>
                </ProtectedRoute>
              } />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />

                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotel">
              <Route index element={ <ProtectedRoute><List  columns={hotelColumns}/></ProtectedRoute>} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel  />                  
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="room">
              <Route index element={ <ProtectedRoute><List  columns={roomColumns}/></ProtectedRoute>} />
              <Route path=":roomId" element={<Single />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom columns={roomColumns}  />                  
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
