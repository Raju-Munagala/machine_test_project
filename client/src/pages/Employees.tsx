import { ChangeEvent, useEffect, useState } from 'react'
import { EmployeeInterface } from '../interfaces/EmployeeInterface'
import { deleteEmployee, getEmployees } from '../api';
import { FaUserAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FcPrevious } from "react-icons/fc";
import _ from 'lodash'
import EditEmployee from '../components/EditEmployee';
import AddEmployeeComponent from '../components/AddEmployee';
import Toast from '../components/Toast';
import DeleteAlert from '../components/DeleteAlert';

interface props {
    handleShowToast : () => void
}

const initialEditEmp = {
    f_id : 0,
    _id : '',
    f_name : '',
    f_email : '',
    f_mobile : 0,
    f_designation : '',
    f_gender : '',
    f_course : '',
    f_image : '',
    createdAt :'',
    updatedAt : '',
    __v : 0
  }
const mock_emp : EmployeeInterface[] = [{
    "_id": "673f728c955b2424b737e729",
    "f_id": 1,
    "f_image": "",
    "f_name": "employee1",
    "f_email": "abcd@gmail.com",
    "f_mobile": 8967328728,
    "f_designation": "HR",
    "f_gender": "M",
    "f_course": "MCA",
    "createdAt":  "2024-11-21T17:49:00.402Z",
    "updatedAt" : "2024-11-21T17:49:00.402Z",
    "__v": 0
  },
  {
    "_id": 
      "673f739b33b4f4549851edad",
    "f_id": 4,
    "f_image": "",
    "f_name": "employee2",
    "f_email": "abcd@gmai.com",
    "f_mobile": 8967328729,
    "f_designation": "HR",
    "f_gender": "F",
    "f_course": "MCA",
    "createdAt": "2024-11-21T17:53:31.970Z",
    "updatedAt":  "2024-11-21T17:53:31.970Z",
    "__v": 0
  },
  {
    "_id": "673f74d60a5aad373cf35485",
    "f_id": 5,
    "f_image": "",
    "f_name": "employee3",
    "f_email": "abcdef@gmai.co",
    "f_mobile": 8967328090,
    "f_designation": "HR",
    "f_gender": "F",
    "f_course": "MCA",
    "createdAt": "2024-11-21T17:58:46.106Z",
    "updatedAt": "2024-11-21T18:09:20.251Z",
    "__v": 0
  },
  {
    "_id": "6740172d5fa293a5cff39df1",
    "f_id": 21,
    "f_image": "",
    "f_name": "Amit Sharma",
    "f_email": "amit.sharma@example.com",
    "f_mobile":  9876543210,
    "f_designation": "HR",
    "f_gender": "M",
    "f_course": "MCA",
    "createdAt": "2024-08-15T10:30:31.970Z",
    "updatedAt":  "2024-08-15T10:30:31.970Z",
    "__v": 0
  },
  {
    "_id": "6740172d5fa293a5cff39df2",
    "f_id": 22,
    "f_image": "",
    "f_name": "Priya Gupta",
    "f_email": "priya.gupta@example.com",
    "f_mobile":  8967328729,
    "f_designation": "Manager",
    "f_gender": "F",
    "f_course": "BCA",
    "createdAt": "2024-09-10T12:01:45.870Z",
    "updatedAt": "2024-09-10T12:01:45.870Z",
    "__v": 0
  },
  {
    "_id": "673f728c955b2424b737e729",
    "f_id": 1,
    "f_image": "",
    "f_name": "employee1",
    "f_email": "abcd@gmail.com",
    "f_mobile": 8967328728,
    "f_designation": "HR",
    "f_gender": "M",
    "f_course": "MCA",
    "createdAt":  "2024-11-21T17:49:00.402Z",
    "updatedAt" : "2024-11-21T17:49:00.402Z",
    "__v": 0
  },
  {
    "_id": 
      "673f739b33b4f4549851edad",
    "f_id": 4,
    "f_image": "",
    "f_name": "employee2",
    "f_email": "abcd@gmai.com",
    "f_mobile": 8967328729,
    "f_designation": "HR",
    "f_gender": "F",
    "f_course": "MCA",
    "createdAt": "2024-11-21T17:53:31.970Z",
    "updatedAt":  "2024-11-21T17:53:31.970Z",
    "__v": 0
  },
  
]



  




const Employees = () => {

  const [employees, setEmployees] = useState<EmployeeInterface[]>(mock_emp);
  const [pageNo, setPageNo] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(7);
  // Page numbers that appears at the pagination
  const [pageNumbers, setPageNumbers] = useState<number[]>([1]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalEmpCount, setTotalEmpCount] = useState(0);
  const [sortCategory,setSortCategory] = useState('f_id');
  const [isDescendingOrder, setIsDescendingOrder]  = useState(false);
  const [searchedValue, setSearchedValue] = useState<string>('');
  const [addEmployeeModalShow, setAddEmployeeModalShow] = useState(false);
  const [editEmployeeShow, setEditEmployeeShow] = useState(false);
  const [currentEditEmp, setCurrentEditEmp] = useState<EmployeeInterface>(
    initialEditEmp
  );
  const [userToDelete, setUserToDelete] = useState('');
  const [deleteAlertShow , setDeleteAlertShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [userDeleted, setUserDeleted] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastStyles, setToastStyles] = useState('bg-blue-600 text-white');
  const [userNameToDelete, setUserNameToDelete] = useState('')


  const handleShowToast = () => {
      setToastShow(true)
      setTimeout(() => 
        {
            setToastShow(false); console.log(false)
        }, 3000)
    }
  const handleEdit = (emp : EmployeeInterface) => {
    console.log('clicked')
    setCurrentEditEmp(emp);
    setEditEmployeeShow(true);
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setPageNo(1);
    setSearchedValue(event.target.value)
  }

    const handleSortCategoryChange = (clickedCategory: string) => {
        if(clickedCategory == sortCategory){
            setIsDescendingOrder(!isDescendingOrder);
        }
        else{
            setSortCategory(clickedCategory);
            setIsDescendingOrder(false);
        }
    }

    const handleDeleteModalShow = (e : EmployeeInterface) => {
        setDeleteAlertShow(true);
        setUserToDelete(e._id);
        setUserNameToDelete(e.f_name)
    }
    const handleDeleteEmployee = (_id : string) => {

         deleteEmployee({_id}).then(res => 
            {
                setToastStyles('bg-red-600 text-white');
                setToastMsg('Employee deleted Successfully')
                console.log(res);
                setUserDeleted(!userDeleted);
                handleShowToast();
            })
            .catch(err => console.log(err))
    }

  // Returns 3 page numbers in array
  const arrangePageNumbers = (currentPageNumber:number, maximumPages:number) => {
        let pageNumbers = [];

        if (currentPageNumber === 1) {
            pageNumbers = _.range(1, Math.min(4, maximumPages + 1));
        } else if (currentPageNumber === maximumPages) {
            pageNumbers = _.range(Math.max(1, currentPageNumber - 2), maximumPages + 1);
        } else {
            pageNumbers = _.range(Math.max(currentPageNumber - 1, 1), Math.min(currentPageNumber + 2, maximumPages + 1));
        }

        setPageNumbers(pageNumbers);
    };

//   const arrangePageNumbers = (currentPageNumber : number, maximumPages : number) =>{
//         if(currentPageNumber == 1){
//             setPageNumbers(_.range(1, Math.min(1+3, maximumPages+1)));
//         }
//         else if(currentPageNumber == maximumPages){
//             setPageNumbers(_.range(Math.max(1, currentPageNumber-3), maximumPages+1))
//         }
//         else{
//             console.log(currentPageNumber, currentPageNumber -1, currentPageNumber + 2)
//             setPageNumbers(_.range(Math.max(currentPageNumber - 1, 1), Math.min(currentPageNumber + 1, maximumPages)))
//         }
        
//     }


   const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth(); // Months are zero-indexed
    const year = date.getUTCFullYear().toString().slice(-2); // Get the last two digits of the year

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${day}-${months[month]}-${year}`;

    return formattedDate.toLowerCase();
}
  
  useEffect(() => {
    getEmployees({pageNo, itemsPerPage, sortCategory, isDescendingOrder, searchedValue})
        .then(res => 
        {
            setEmployees(res.data.data.employees);
            setTotalPages(res.data.data.noOfPages);
            setPageNo(res.data.data.currentPage);
            arrangePageNumbers(res.data.data.currentPage, res.data.data.noOfPages);
            setTotalEmpCount(res.data.data.totalRecords)
        })
        .catch(err => {console.log(err), setError(JSON.stringify(err))});
    
  }, [pageNo, itemsPerPage, sortCategory, isDescendingOrder, searchedValue, addEmployeeModalShow, editEmployeeShow, userDeleted])
    

  return (
    !employees? 
    <div className='flex h-full w-full items-center justify-center '>
       <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
    </div> 
    :
    <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className='font-bold  px-2 py-1'>
                Employees List
            </div>
            
            <div className='flex items-center gap-4'>
                <div className="relative ml-2 my-2">
                        <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input onChange={handleSearch} type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                </div>
                <button className='flex justify-center gap-2 border p-2 border-gray-300 rounded-lg bg-blue-500 text-white' onClick={() => setAddEmployeeModalShow(true)}>
                    <MdPersonAddAlt1 size={25} color='white' className=''/> 
                    <p>Add Employee</p>
                </button>
            </div>
            
            
            
            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 mt-1">
                <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400 bg-[#E6F0FA]">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Unique ID
                                <a onClick={() => {handleSortCategoryChange('f_id')}} className='hover:cursor-pointer'><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                            </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>

                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Name
                                <a onClick={() => {handleSortCategoryChange('f_name')}} className='hover:cursor-pointer'><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                            </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Email
                                <a onClick={() => {handleSortCategoryChange('f_email')}} className='hover:cursor-pointer'><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                            </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mobile No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Designation
                                <a onClick={() => {handleSortCategoryChange('f_designation')}} className='hover:cursor-pointer'><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Gender
                                <a onClick={() => {handleSortCategoryChange('f_gender')}} className='hover:cursor-pointer'><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Course
                                <a onClick={() => {handleSortCategoryChange('f_course')}} className='hover:cursor-pointer'><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Create Date
                                <a onClick={() => {handleSortCategoryChange('createdAt')}} className='hover:cursor-pointer'><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    
                    {employees.map((e, ind) => {
                        return <tr key={ind} className={ind % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#F5FAFF]"}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {e.f_id}
                            </th>
                            <td className="px-5 py-4 ">{e.f_image && e.f_image !== '' ? 
                                <><img src={e.f_image} alt="user image" className='h-16 w-16 rounded-full'/></> : 
                                <><FaUserAlt size={25}/></>}
                            </td>
                            <td className="px-6 py-4">{e.f_name}</td>
                            <td className="px-6 py-4">{e.f_email}</td>
                            <td className="px-6 py-4">{e.f_mobile}</td>
                            <td className="px-6 py-4">{e.f_designation}</td>
                            <td className="px-6 py-4">{e.f_gender}</td>
                            <td className="px-6 py-4">{e.f_course}</td>
                            <td className="px-6 py-4">{formatDate(e.createdAt)}</td>
                            <td className="px-6 py-4 flex gap-3">
                                <button className=' px-2 flex flex-col justify-center items-center' onClick={() => handleEdit(e)}>
                                    <MdEdit size={20} color='#60a5fa' className='to-blue-400'/>
                                    <p className='text-xs text-slate-700'>Edit</p>
                                </button>
                                <button className='px-2 flex flex-col justify-center items-center' onClick={() => handleDeleteModalShow(e)}>
                                    <MdDelete color='red' size={20}/>
                                    <p className='text-xs text-slate-700'>Delete</p>
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        <div className={`flex justify-end px-4 mt-1 mr-20 gap-0.5 items-center ${pageNumbers.length > 0 ? "block" : "hidden"} mb-2`}>
            <p className='mx-4 text-slate-600 text-sm'>Page {pageNo} out of {totalPages}</p>
            <button className='p-1 border border-inherit rounded-md' disabled={pageNo == 1} onClick={() => setPageNo(pageNo-1)} ><FcPrevious /></button>
            {pageNumbers.map((p, ind) => <button key={ind} className={`p-1 border border-inherit  min-w-[27px] rounded-md ${pageNo == p ? "bg-blue-400 text-white" : "text-blue-400"}`} onClick={() => setPageNo(p)}>{p}</button>)}
            {/* <button className='p-1 border border-inherit text-blue-400 min-w-[27px] rounded-md'>1</button>
            <button className='p-1 border border-inherit text-blue-400 min-w-[27px] rounded-md'>2</button>
            <button className='p-1 border border-inherit text-blue-400 min-w-[27px] rounded-md'>3</button> */}
            <button className='p-1 border border-inherit rotate-180 rounded-md' disabled={pageNo == totalPages}  onClick={() => setPageNo(pageNo+1)}><FcPrevious /></button>
        </div>
        <div className={`${addEmployeeModalShow ? "block" : "hidden"}`}>
            <AddEmployeeComponent showModal={addEmployeeModalShow} setShowModal={setAddEmployeeModalShow} showToastNotification={handleShowToast} setToastMsg={setToastMsg} setToastStyles={setToastStyles}/>
        </div>
        <div className={`${editEmployeeShow ? "block" : "hidden"}`}>
            <EditEmployee showModal={editEmployeeShow} setShowModal={setEditEmployeeShow} employee={currentEditEmp} handleToastNotification={handleShowToast} setToastMsg={setToastMsg} setToastStyles={setToastStyles}/>
        </div>
        <div className={`${deleteAlertShow ? "block" : "hidden"}`}>
            <DeleteAlert f_name={userNameToDelete} deleteEvent={handleDeleteEmployee} setDeleteAlertShow={setDeleteAlertShow} f_id={userToDelete}/>
        </div>
        <Toast message={toastMsg} show={toastShow} additionalStyles={toastStyles}/>
    </div>
    


  )
}

export default Employees
