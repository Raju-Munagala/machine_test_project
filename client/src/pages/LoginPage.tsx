import { useEffect, useState } from "react"
import logo from  "../assets/logo.jpg"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../api"
const LoginPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState<any>({
        f_userName : '',
        f_pwd : ''
    });
    const [error, setError] = useState<boolean>(false);

    const handleLogin = () => {
        setError(false);
        loginUser(user).then(res => {
        localStorage.setItem('f_userName', user.f_userName);
        navigate('/');
        setUser({
            f_username : '',
            f_pwd : '' 
        })
       })
       .catch(err => {
        console.log(err.response.data.message)
        setError(true)
        setErrorMessage(err.response.data.message)
    })
    }
    const handleInputChange = (key:string, value : string) => {
        setUser({
            ...user,
            [key] : value
        });
    };

    useEffect(() => {
        if(localStorage.getItem('f_name') && localStorage.getItem('f_name') != ''){
            navigate('/');
        }
    }, [])
    
  return (
    <div className="grid grid-cols-2 w-screen h-screen overflow-hidden">
        <div className="flex justify-center items-center">
            <div className="w-3/4 h-3/4 ">
                <img src={logo} alt="" className="w-full h-full" />
            </div>
        </div>
        <div className="flex justify-start items-center ">
             <div className="border border-inherit p-6 rounded-lg shadow-md">
                <div className="py-2">
                    <h1 className="font-bold text-3xl">Login to Employee Hub</h1>
                </div>
                <div className="flex gap-2 sm:w-full  items-center my-4">
                    <div><label htmlFor="username" className="text-xl">User Name</label></div>
                    <input type="text" name="f_username" id="" className="outline-none border border-slate-200 p-2 h-10 rounded-md md:w-[300px] w-full"  onChange={(e) => handleInputChange('f_userName', e.target.value)}/>
                </div>
                <div className="flex gap-2 w-full items-center my-2">
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input type="password" name="f_pwd" id="" className="outline-none border border-slate-200 p-2 ml-[13.5px] h-10 rounded-md md:w-[300px] w-full" onChange={(e) => handleInputChange('f_pwd', e.target.value)}/>                       
                </div>
                <div className="flex justify-center  bg-blue-500 h-[40px] w-full mt-6 rounded-lg" onClick={() => handleLogin()}>
                    <button className="text-white w-full h-full">Login</button>
                </div>
                <div className={`${error ? "block" : "hidden"} flex items-center justify-center pt-1`}>
                    <p className="text-sm text-red-600">{errorMessage || "Invalid Credentials"}</p>
                </div>
                <div className="text-center mt-2">
                    <p>Not registered yet ? <Link to="/register" className="text-blue-500 underline">Signup</Link></p>
                </div>
             </div>     
        </div>
    </div>
  )
}

export default LoginPage
