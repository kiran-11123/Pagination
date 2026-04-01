import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './componenets/Opening_page/home'
import Login from './componenets/Auth_Pages/Login'
import Register from './componenets/Auth_Pages/Register'
import ForgetPassword from './componenets/Auth_Pages/ForgetPassword'
import Main from './componenets/Home/main'
import SideBar from './componenets/Home/Sidebar'
function App() {
  

  return (

    <BrowserRouter >
         <Routes>

          <Route path='/' element={<Home />} />
          <Route path="/login" element={< Login/>} />
          <Route path="/register" element={< Register/>} />
          <Route path="/forget-password" element={< ForgetPassword/>} />
          <Route path="/home"  element = { < Main/>}/> 
          <Route path="/sidebar"  element = { < SideBar/>}/>
                
              

         </Routes>
     </BrowserRouter>
    
  )
}

export default App
