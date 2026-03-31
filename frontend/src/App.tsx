import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './componenets/Opening_page/home'
import Login from './componenets/Auth_Pages/Login'
import Register from './componenets/Auth_Pages/Register'
function App() {
  

  return (

    <BrowserRouter >
         <Routes>

          <Route path='/' element={<Home />} />
          <Route path="/login" element={< Login/>} />
          <Route path="/register" element={< Register/>} />
                
              

         </Routes>
     </BrowserRouter>
    
  )
}

export default App
