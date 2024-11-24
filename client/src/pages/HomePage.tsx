import { Link, Outlet } from "react-router-dom"
import logo from "../assets/logo_transparent.png"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { RiHome4Line } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [endPoint, setEndpoint] = useState('');
  const [username, setUsername] = useState('');
  const [toastShow, setToastShow] = useState(false);


  // const handleShowToast = () => {
  //   setToastShow(true)
  //   setTimeout(() => 
  //     {
  //         setToastShow(false); console.log(false)
  //     }, 3000)
  // }
  const handleLogout = () => {
    console.log('clicked')
    localStorage.removeItem('f_userName')
    navigate('/login');
  }

  const location = useLocation();
  useEffect(() => {
    setEndpoint(location.pathname);
    if(!localStorage.getItem('f_userName') || localStorage.getItem('f_userName') == ''){
        navigate('/login');
    }
    setUsername(localStorage.getItem('f_userName') || '');
  }, [location, username])
  return (
    <div>
      <nav className="flex bg-slate-300 text-gray-800">
        <div className="w-20 h-20 p-1 ml-1">
          <img src={logo} alt="Logo" className=" rounded-2xl w-full h-full"/>
        </div>
        <div className="flex justify-around w-full items-center font-bold text-xl ">
            <div className={`${endPoint == '/' ? "underline" : ""} flex gap-2 items-center`}> <RiHome4Line size={25} color="black"/> <Link to="/">Home</Link></div>
            <div className={`${endPoint === '/employees' ? "underline" : ""} flex gap-3 items-center`}><GrGroup size={25}/><Link to="/employees">Employees</Link></div>
            <div className="hover:cursor-pointer hover:underline flex gap-2 items-center"> <FaRegUser size={25}/> <div>{username}</div></div>
            <div className="hover:cursor-pointer hover:underline flex gap-2 items-center" onClick={() => handleLogout()}><IoIosLogOut size={25} /><div>Logout</div></div>
        </div>
        
      </nav>
      {/* <div><button onClick={() => handleShowToast()}>Toast</button></div>
      <Toast message="Registered successfully" show={toastShow}/> */}
      <Outlet />
    </div>
  )
}

export default HomePage
