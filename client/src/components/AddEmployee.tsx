import React, { ChangeEvent, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { addEmployee, loginUser, uploadImage } from "../api";

const initialForm = {
  f_name : '',
  f_email : '',
  f_mobile : '',
  f_designation : '',
  f_gender : '',
  f_course : '',
  f_image : ''
}


interface ErrorObject {
  [key: string]: string;
}

interface ErrorsInterface{
      f_name : string,
      f_email :string,
      f_mobile : string,
      f_designation : string,
      f_gender : string,
      f_course : string,
      f_image : string
}



interface props {
  showModal :boolean,
  setShowModal : React.Dispatch<React.SetStateAction<boolean>>,
  showToastNotification : () => void,
  setToastMsg : React.Dispatch<React.SetStateAction<string>>,
  setToastStyles : React.Dispatch<React.SetStateAction<string>>,
}
const AddEmployeeComponent:React.FC<props> = ({showModal, setShowModal, showToastNotification, setToastMsg, setToastStyles}) => {

  const [empImage, setEmpImage] = useState<File | null>(null);

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    BSC: false,
    BCA: false,
    MCA: false,
  });

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    console.log(name, checked)
    // console.log(name, checked, event)
    setCheckedItems(prevState => ({
      ...prevState,
      [name]: checked,
    }));
    setTimeout(() => {
      console.log({...checkedItems,
      [name] : checked})
    }, 1000)
  };

  const groupErrors = (errorsArray: ErrorObject[]): any =>  {
    return errorsArray.reduce((acc, errorObj) => {
        const [key, message] = Object.entries(errorObj)[0] as [string, string];
        if (!acc[key]) {
            acc[key] = message;
        } else {
            acc[key] += `, ${message}`;
        }
        return acc;
    }, {} as { [key: string]: string });
  }

  const updateErrorResponse =  (keyVal : string, value : string) => {
    setErrors({
      ...errors,
      [keyVal] : value
    })
  }
  
  const [employeeForm, setEmployeeForm] = useState({
      f_name : '',
      f_email : '',
      f_mobile : '',
      f_designation : '',
      f_gender : '',
      f_course : '',
      f_image : ''
  });

  // Same names used to make sure to be consistent with err response
  const [errors, setErrors] = useState<ErrorsInterface>({
      f_name : '',
      f_email : '',
      f_mobile : '',
      f_designation : '',
      f_gender : '',
      f_course : '',
      f_image : ''
  })

  const onInputChange = (inputField : string, inputValue : string) => {
    setEmployeeForm({
      ...employeeForm,
      [inputField] : inputValue
    })
  };

  
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Object.keys(checkedItems).forEach(i => {
    //   console.log(i, checkedItems[i])
    //   if(checkedItems[i] == true){
    //     console.log('in')
    //     setEmployeeForm({
    //       ...employeeForm,
    //       'f_course' : i
    //     })
    //   }
    // });
    const selectedCourse = Object.keys(checkedItems).find((key) => checkedItems[key]);
    console.log(selectedCourse)
    setEmployeeForm({
      ...employeeForm,
      'f_course' : selectedCourse ||''
    });
    
    let updatedForm  = {
      ...employeeForm,
      'f_course' : selectedCourse ||''
    }
    if(empImage != null){
      const imageUrl = await uploadImage(empImage)
      .then(res => {
        console.log(res.data);
        // setEmployeeForm({
        //   ...employeeForm,
        //   f_image : res.data.fileURL
        // })
        updatedForm = {...updatedForm, f_image: res.data.fileURL}
      })
      .catch(err => console.log(err));
      }
      console.log(updatedForm);
      await addEmployee(updatedForm)
            .then(res => {
              setToastMsg("Employee added Successfully");
              setToastStyles('bg-blue-600 text-white');
              setEmployeeForm(initialForm);
              setErrors(initialForm);
              setShowModal(false);
              showToastNotification();
            })
            .catch(err =>
              {
                console.log(err.response)
                const groupedErr = groupErrors(err.response.data.errors);
                setErrors(groupedErr);
              }        
      ); 
  }




  function hanldeFileChange(event: ChangeEvent<HTMLInputElement>): void {
    
    if(event.target.files && event.target.files.length > 0){
      setEmpImage(event.target.files[0]);
    }
  }

  

  return (
    <div className="absolute w-screen h-screen top-0 left-0 flex justify-center items-center" style={{backgroundColor : "rgba(0, 0, 0, 0.5"}}>
        <div className="w-1/2  justify-center items-center bg-white border rounded-lg p-5 animate-slideFromTop">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl pb-2 ml-5">Create Employee</h1>
          <div className="cursor-pointer" onClick={() => {setShowModal(false)}}><IoCloseSharp size={25}/></div>
        </div >
          <form className="w-[90%] mx-auto border border-slate-200 rounded-lg p-5">
            <div>
              <div className="flex gap-4 items-center w-full mt-4">
                  <div className="block mb-2  font-medium text-gray-900 dark:text-white">Name</div>
                  <div className="w-full ml-7">
                    <input type="text" name="" id="" className="outline-none border border-slate-400 rounded-lg px-3 py-1 w-[85%]" placeholder="Enter Employee name..." onChange={(e) => onInputChange('f_name', e.target.value)}/>
                    <p className="text-xs text-red-500 " >{errors.f_name !== '' ? errors.f_name : ''}</p>
                  </div>
              </div>
              
            </div>
            
            <div className="flex gap-4 items-center w-full my-4">
                <div className="block mb-2  font-medium text-gray-900 dark:text-white">Email</div>
                <div className="w-full ml-8">
                  <input type="email" name="" id="" className="outline-none border border-slate-400 rounded-lg px-3 py-1 w-[85%]" placeholder="Enter Employee Email..." onChange={(e) => onInputChange('f_email', e.target.value)}/>
                  <p className="text-xs text-red-500">{errors.f_email !== '' ? errors.f_email : ''}</p>
                </div>
            </div>
            <div className="flex gap-4 items-center w-full my-4">
                <div className="block mb-2  font-medium text-gray-900 dark:text-white">MobileNo</div>
                <div className="w-full">
                  <input type="number" name="" id="" className="outline-none border border-slate-400 rounded-lg px-3 py-1 w-[85%]" placeholder="Enter Employee Mobile No..." onChange={(e) => onInputChange('f_mobile', e.target.value)}/>
                  <p className="text-xs text-red-500">{errors.f_mobile !== '' ? errors.f_mobile : ''}</p>  
                </div>
            </div>
            <div className="mb-5">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
              <select id="countries" defaultValue="ab" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {onInputChange('f_designation', e.target.value)}}>
                <option value="ab" disabled>Select One</option>
                <option value = "HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
              <p className="text-xs text-red-500">{errors.f_designation !== '' ? errors.f_designation : ''}</p>
            </div>
            <div className="items-start mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
            <div className="flex">
              <div className="flex items-center me-4">
                  <input id="className-radio" type="radio" value="M" name="className-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={employeeForm.f_gender == 'M'} onChange={(e) => {onInputChange('f_gender', e.target.value)}}/>
                  <label htmlFor="className-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
              </div>
              <div className="flex items-center me-4">
                  <input id="className-2-radio" type="radio" value="F" name="className-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={employeeForm.f_gender == 'F'} onChange={(e) => {onInputChange('f_gender', e.target.value)}}/>
                  <label htmlFor="className-2-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
              </div>
            </div>
            <p className="text-xs text-red-500">{errors.f_gender !== '' ? errors.f_gender : ''}</p>
            </div>
            <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
              <div className="flex">
                <div className="flex items-center me-4">
                    <input id="className-checkbox" type="checkbox" name="BCA" value="BCA" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={checkedItems['BCA']} onChange={handleCheckBoxChange}/>
                    <label htmlFor="className-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">BCA</label>
                </div>
                <div className="flex items-center me-4">
                    <input id="className-2-checkbox" type="checkbox" name="BSC" value="BSC" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={checkedItems['BSC']} onChange={handleCheckBoxChange}/>
                    <label htmlFor="className-2-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">BSC</label>
                </div>
                <div className="flex items-center me-4">
                    <input id="className-2-checkbox" type="checkbox" name="MCA" value="MCA" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={checkedItems['MCA']} onChange={handleCheckBoxChange}/>
                    <label htmlFor="className-2-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">MCA</label>
                </div>
              </div>
              <p className="text-xs text-red-500">{errors.f_course !== '' ? errors.f_course : ''}</p>
            </div>
            
            <div className="flex py-2 gap-4 my-2">
              <label htmlFor="">Employee Image</label>
              <input type="file" name="" id="" className="border-lg"  onChange={hanldeFileChange}/>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>
          
          </form>

        </div>
    </div>
  )
}

export default AddEmployeeComponent
