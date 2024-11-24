import React from 'react'
import { EmployeeInterface } from '../interfaces/EmployeeInterface'


interface props{
    f_name : string
    deleteEvent : (_id: string) => void,
    setDeleteAlertShow : React.Dispatch<boolean>
    f_id : string
}

const DeleteAlert:React.FC<props> = ({f_name,f_id, deleteEvent, setDeleteAlertShow}) => {


    const onCancel = () => {
        setDeleteAlertShow(false);
    }

    const onDelete = () => {
        setDeleteAlertShow(false);
        deleteEvent(f_id);
    }
  return (
    <div className={`w-screen h-screen flex items-center justify-center absolute top-0 left-0`} style={{backgroundColor : "rgba(0, 0, 0, 0.5"}} >
        <div className='w-[30%] p-10 bg-white rounded-lg shadow-md animate-slideFromTop'>    
            <div className='font-bold text-xl p-3 my-2'>
                Are you sure, You want to delete this Employee?
            </div>
            <div className='m-3 text-center font-bold py-2'>
                {f_name}
            </div>
            <div className='flex gap-2 justify-around'>
                <button className='border border-slate-200 w-[40%] rounded-lg h-10' onClick={() => onCancel()}>Cancel</button>
                <button className='border text-white bg-red-600 rounded-lg w-[40%]' onClick={() => onDelete()}>Delete</button>
            </div>

        </div>
      
    </div>
  )
}

export default DeleteAlert
