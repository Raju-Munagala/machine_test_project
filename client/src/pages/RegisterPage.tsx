import { useState } from "react";
import { registerUser } from "../api";
import { Navigate, useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    f_userName : '',
    f_pwd : ''
  });

  const [err, setErr] = useState(false);

  const handleInputChange = (key:string, value : string) => {
      setUser({
          ...user,
          [key] : value
      });
  };

  

  const handleSubmit  = async () => {
    setErr(false);
    await registerUser(user)
    .then(res => {
      setErr(false)
      navigate('/login')
    })
    .catch(err => {
      // console.log(err)
      // console.log(err.response.data.errors)
      const errors = err.response.data.errors
      setErr(true);
      
    })
  }
  console.log(err)  

  return (
    <div className="w-screen h-screen top-0 left-0 flex items-center justify-center">
        <div className="p-10 border border-slate-300 rounded-lg">
            <div className="flex justify-start font-bold text-2xl"><h1>Register User</h1></div>
            <div className="">
              <div className="flex gap-4 py-4">
                <label className="">User Name</label>
                <input type="text" name="" id=""  className="w-[250px] h-[30px] border rounded-md px-3 outline-none py-1 border-slate-400" onChange={(e) => handleInputChange('f_userName', e.target.value)}/>
              </div>
              <div className="flex gap-5 py-2">
                <label htmlFor="">Passsword</label>
                <input type="text" name="" id="" className="w-[250px] h-[30px] border rounded-md px-3 outline-none py-1 border-slate-400" onChange={(e) => {handleInputChange('f_pwd', e.target.value)}}/>
              </div>
              <div className="w-full flex justify-center items-center">
                <button className="w-[80%] bg-blue-600 h-[40px] my-2 text-white hover:bg-blue-500 ease-in-out rounded-lg" onClick={handleSubmit}>Register</button>
              </div>
              <div className={`flex justify-center ${!err ? "hidden" : "block"}`}>
                <p className="text-sm text-red-400">Invalid Input</p>
              </div>
            </div>
        </div>
        
    </div>
  )
}

export default RegisterPage
