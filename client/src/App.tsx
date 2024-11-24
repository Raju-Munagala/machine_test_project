

import logo from "./assets/logo.jpg"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import Employees from "./pages/Employees"
import Dashboard from "./pages/Dashboard"
import RegisterPage from "./pages/RegisterPage"
function App() {


  return (
    <div>
      {/* <div className="w-[100px] h-[100px] ml-3">
        <img src={logo} alt="" className='h-full w-full' />
      </div> */}

      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/" element={<HomePage />} >
            <Route path="" element={<Dashboard/>} />
            <Route path="employees" element={<Employees />}/>
          </Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App
