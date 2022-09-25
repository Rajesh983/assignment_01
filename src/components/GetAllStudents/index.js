import {useState, useEffect}from 'react'

import axios from 'axios';

import { Link } from 'react-router-dom'; 

import {BiSearch} from 'react-icons/bi'

import Header from '../Header';

import './index.css'
import Footer from '../Footer';



const GetAllStudents = () => {
   let [studentsData,setStudentsData] = useState([]);

   let [branchList,setBranchList] = useState([])

   let [searchInputData,setSearchInput] = useState({searchInput:''})

   let [dropdownVal,setDropdownVal] = useState({optionId:''})

   useEffect(() => {
    getAllStudents()
    gettingBranchList()
   },[])

   const getAllStudents = () => {
        axios.get('http://localhost:3000/get')
        .then((response) => {
        setStudentsData(response.data)
        })
        .catch((error) => {
        console.log(error);
        })
        }
 
    const deleteStudent = (id) => {
            axios.delete(`http://localhost:3000/delete-student/${id}`)
            .then(() => {
            getAllStudents()
            })
            .catch((error) => {
            console.log(error)
            })
            }
   

    const gettingBranchList = () => {
        axios.get('http://localhost:3000/branch')
        .then((response) => {
            console.log(response)
        setBranchList([{default:"Select Branch"},...response.data])
        })
        .catch((error) => {
        console.log(error);
        })
    }


    const gettingUserInput = event => {
        setSearchInput({searchInput:event.target.value})
    }

    const displaySearchedData = () => {
        if(searchInputData.searchInput !== ''){
            axios.get(`http://localhost:3000/find-search/${searchInputData.searchInput}`)
            .then(response => {
                setStudentsData(response.data)
            })
            .catch(err => {
                console.log(err)
            })
            setSearchInput({searchInput:''})
        }
        else{
            getAllStudents()
        }
    }

   
    const onChangeDropdown = (event) => {
        setDropdownVal({optionId:event.target.value})
        if(event.target.value !== ''){
            axios.get(`http://localhost:3000/branch/${event.target.value}`)
            .then(response => {
                setStudentsData(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            getAllStudents()
        }

    }


   const onResetDropdown = () => {
    setDropdownVal({optionId:''})
   }


    
    
    return (
     <>
    <Header onGetAll={getAllStudents} onResetDropdown={onResetDropdown}/>
    {/* {console.log(branchList)} */}
    

    <div className='app-bg-container'>

    {studentsData.length !== 0 && <div className='search-filter-container'>
        <div className='search-container'>
           <input type='search' placeholder='Search for Id,Name,Class,Branch' className='search-box' onChange={gettingUserInput} value={searchInputData.searchInput}/>
           <button type="button" className='search-icon' onClick={displaySearchedData}><BiSearch/></button>
        </div>
        <select className='drop-down' value={dropdownVal.optionId} onChange={onChangeDropdown}>
            <option value='' selected>Select Branch</option>
            {branchList.slice(1,branchList.length).map((eachItem,currInd) => <option value={eachItem.Branch} id={currInd} key={currInd}>{eachItem.Branch}</option> )}
        </select>
    </div>}



    {studentsData.length !== 0 && <table className='table-view'>
    <thead>
    <tr>
    <th>Student Id</th>
    <th>Student Name</th>
    <th>Branch</th>
    <th>Class</th>
    <th>Manage Options</th>
    </tr>
    </thead>
    <tbody>
    {
    studentsData.map((student) => {
    return (
    <tr key={student.StudentId}>
    <td ><div className='table-name'>{student.StudentId}</div></td>
    <td ><div className='table-name'>{student.StudentName}</div></td>
    <td ><div className='table-name'>{student.Branch}</div></td>
    <td ><div className='table-name'>{student.Class}</div></td>
    <td className='button-styles'>
    <Link to={`/update-student/${student._id}`} style={{"textDecoration":'none'}}><button className='edit-btn'>Edit</button></Link>
    <button onClick={()=>deleteStudent(student._id)} className="edit-btn del-btn">Delete</button>
    </td>
    </tr>
    )
    })
    }
    </tbody>
    </table> }

    {studentsData.length === 0 && <h1>No Students are there!</h1>}

    <Footer />
    </div>
    </>
    );
}



export default GetAllStudents