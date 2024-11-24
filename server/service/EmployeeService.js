import { asyncHandler } from "../utils/asyncHandler.js";
import { t_employee } from "../models/EmployeeModal.js";
import { ApiError } from "../utils/ApiError.js";
import { getNextId } from "../utils/nextIdValue.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { Mongoose } from "mongoose";


const addEmployee = asyncHandler(async (req, res) => {
    const employee = req.body;

    const existedEmployee = await t_employee.findOne({
        $or : [ {f_id : employee.f_id}, {f_email : employee.f_email}]
    });
    const nextId = await getNextId('employee');
    employee.f_id = nextId;
    if(existedEmployee){
        throw new ApiError(409, "Employee already exists", []);
    }

    const newEmployee = await t_employee.create(employee);
    newEmployee.save({validateBeforeSave : false});

    const createdEmployee = await t_employee.findById(newEmployee._id);

    return res.status(201).json(new ApiResponse(201, createdEmployee, "Employee added successfully"))


});


const editEmployee = asyncHandler(async(req, res) => {
    const {_id, ...employee} = req.body; // excluding the _id
    if(!_id || !mongoose.isValidObjectId(_id)){
        throw new ApiError(404, "Employee not found");
    }
    const existedEmployee = await t_employee.findOne({
        $or : [{_id : new mongoose.Types.ObjectId(_id)}, {f_id : employee.f_id}, {f_email : employee.f_email}]
    });

    if(!existedEmployee){
        throw new ApiError(404, "Employee not found with the given details");
    };

    const updatedEmployee = await t_employee.findByIdAndUpdate(existedEmployee._id, employee, {new : true, runValidators : true});
    return res.status(200).json(new ApiResponse(201, updatedEmployee, "Employee details have been updated"));
});


const getEmployeesList = asyncHandler(async (req, res) => {
    const {sortCategory, isDescendingOrder, pageNo = 1, itemsPerPage = 10, searchedValue = ''} = req.body;
    if(sortCategory === 'f_id'){
        const result = await searchEmployeesOrderById( sortCategory , isDescendingOrder, pageNo , itemsPerPage , searchedValue)
        return res.status(201).json(new ApiResponse(201, result, "Employees match with the given key"))
    }
    const totalCount = await t_employee.find({
        
            $or: searchedValue ? [
                { f_name: { $regex: searchedValue, $options: 'i' } },
                { f_email: { $regex: searchedValue, $options: 'i' } }
            ] : [{}]
        }
    ).countDocuments();
    // const pipeline = [
    //     {
    //         $match: {}
    //     },
    //     {
    //         $sort : {
    //                     [sortCategory && sortCategory !== '' ? sortCategory : 'f_id'] : isDescendingOrder ? -1 : 1,
    //                     'f_id' : isDescendingOrder ? -1 : 1
    //                 }
    //     },
    //     {
    //         $skip : (pageNo-1)*itemsPerPage
    //     },
    //     {
    //         $limit : itemsPerPage
    //     }
    // ]
    const pipeline = [
        {
            $match: {
                $or: searchedValue ? [
                    { f_name: { $regex: searchedValue, $options: 'i' } },
                    { f_email: { $regex: searchedValue, $options: 'i' } }
                ] : [{}]
            }
        },
        {
            $addFields : {
                lowerCaseSortCategory : {$toLower : `$${sortCategory}`}
            }
        },
        {
            $sort: {
                lowerCaseSortCategory : isDescendingOrder ? -1 : 1,
                'f_id': isDescendingOrder ? -1 : 1
            }
        },
        {
            $skip: (pageNo - 1) * itemsPerPage
        },
        {
            $limit: itemsPerPage
        },
        {
            // Optionally remove the lowerCaseSortCategory field if not needed in the output
            $project: {
                lowerCaseSortCategory: 0
            }
        }
    ];
    

    const empList = await t_employee.aggregate(pipeline);

    const response = {
        totalRecords : totalCount,
        employees : empList,
        noOfPages : Math.ceil(totalCount/itemsPerPage),
        currentPage : pageNo
    }

    if(!empList){
        throw new ApiError(500, "Something went wrong");
    }
    return res.status(201).json(new ApiResponse(201, response, "List of employees"));
})



const searchEmployees = asyncHandler(async (req, res) => {
    let { searchedValue = '', pageNo = 1, itemsPerPage = 7, sortCategory , isDescendingOrder } = req.body;
    if(sortCategory == 'f_id'){
        sortCategory = ''
    }
        
    // const pipeline = [
    //     {
    //         $match :{ $or : [ {f_name : {$regex : new RegExp(searchedValue, 'i')}}, {f_email : {$regex : new RegExp(searchedValue, 'i')}}]}
    //     },
    //     {
    //         $sort : {
    //             'f_id' : 1
    //         }
    //     },
    //     {
    //         $skip : (pageNo-1)*itemsPerPage
    //     },
    //     {
    //         $limit : itemsPerPage
    //     }
    //   ]

    // const pipeline = [
    //     {
    //         $match: {
    //             $or: [
    //                 { f_name: { $regex: searchedValue, $options: 'i' } },
    //                 { f_email: { $regex: searchedValue, $options: 'i' } }
    //             ]
    //         }
    //     },
    //     {
    //         // Add this stage to add lowercased versions of the fields for sorting
    //         $addFields: {
    //             lowerCaseSortCategory: {
    //                 $toLower: `$${sortCategory && sortCategory !== '' ? sortCategory : 'f_id'}`
    //             },
    //         }
    //     },
    //     {
    //         $sort: {
    //             [lowerCaseSortCategory && lowerCaseSortCategory != '' ? lowerCaseSortCategory : f_id] : isDescendingOrder ? -1 : 1,
    //             'f_id': 1
    //         }
    //     },
    //     {
    //         $skip: (pageNo - 1) * itemsPerPage
    //     },
    //     {
    //         $limit: itemsPerPage
    //     },
    //     {
    //         // Optionally remove the lowerCaseSortCategory field if not needed in the output
    //         $project: {
    //             lowerCaseSortCategory: 0
    //         }
    //     }
    // ];

    const pipeline = [
        {
            $match: {
                $or: searchedValue ? [
                    { f_name: { $regex: searchedValue, $options: 'i' } },
                    { f_email: { $regex: searchedValue, $options: 'i' } }
                ] : [{}]
            }
        },
        {
            // Ensure f_id is converted to an integer
            $addFields: {
                f_id_int: { $toInt: "$f_id" },
                lowerCaseSortCategory: {
                    $cond: {
                        if: { $eq: [sortCategory, 'f_id'] },
                        then: "$f_id_int",
                        else: { $toLower: `$${sortCategory && sortCategory !== '' ? sortCategory : 'f_name'}` }
                    }
                }
            }
        },
        {
            $sort: {
                lowerCaseSortCategory: isDescendingOrder ? -1 : 1
            }
        },
        {
            $skip: (pageNo - 1) * itemsPerPage
        },
        {
            $limit: itemsPerPage
        },
        {
            // Optionally remove the temporary fields if not needed in the output
            $project: {
                f_id_int: 0,
                lowerCaseSortCategory: 0
            }
        }
    ];
    

      const totalRecordsCount = await t_employee.find(
        {
            $or: [
                { f_name: { $regex: searchedValue, $options: 'i' } },
                { f_email: { $regex: searchedValue, $options: 'i' } }
            ]
        }
    ).countDocuments();
      const emp_list = await t_employee.aggregate(pipeline);
      const response = {
        employees : emp_list,
        noOfPages : Math.ceil(totalRecordsCount/itemsPerPage),
        currentPage : pageNo,
        totalRecords : totalRecordsCount
      };


      return res.status(201).json(new ApiResponse(201, response, "Users matched with given value"));
 

});



const searchEmployeesOrderById = async( sortCategory , isDescendingOrder, pageNo = 1, itemsPerPage = 10, searchedValue = '') => {
    const totalRecordsCount = await t_employee.find({
        $or: searchedValue ? [
            { f_name: { $regex: searchedValue, $options: 'i' } },
            { f_email: { $regex: searchedValue, $options: 'i' } }
        ] : [{}]
    }).countDocuments();


    const pipeline = [
        {
            $match: {
                $or: searchedValue ? [
                    { f_name: { $regex: searchedValue, $options: 'i' } },
                    { f_email: { $regex: searchedValue, $options: 'i' } }
                ] : [{}]
            }
        },
        {
            $sort: {
                'f_id': isDescendingOrder ? -1 : 1
            }
        },
        {
            $skip: (pageNo - 1) * itemsPerPage
        },
        {
            $limit: itemsPerPage
        },
        {
            // Optionally remove the lowerCaseSortCategory field if not needed in the output
            $project: {
                lowerCaseSortCategory: 0
            }
        }
    ];


    const employees = await t_employee.aggregate(pipeline);

    const resData = {
        employees : employees,
        noOfPages : Math.ceil(totalRecordsCount/itemsPerPage),
        currentPage : pageNo,
        totalRecords : totalRecordsCount

    }
    return resData
}




const deleteEmployee = asyncHandler(async(req, res) => {
    const {_id, f_id} = req.params
    const result = await t_employee.findById(_id);
    if(!result){
        throw new ApiError(404, "Employee not found");
    }
    await t_employee.deleteOne({_id});
    return res.status(204).json(new ApiResponse(204, null , `User Id ${_id} is successfully deleted`))
})

export {addEmployee, editEmployee, getEmployeesList,searchEmployees, deleteEmployee}
