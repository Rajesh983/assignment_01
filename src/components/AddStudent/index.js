import { useState ,useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import './index.css'

const AddStudent = () => {
    const Navigate = useNavigate()

    let [allStudents,setStudents] = useState([])

    let [inputStudentData,setInputData] =useState({studentName:'',studentBranch:'',studentClass:''})

    let [branchList,setBranchList] = useState([])


   useEffect(() => {
    getAllStudents()
    gettingBranchList()
   },[])

   const getAllStudents = () => {
        axios.get('http://localhost:3000/get')
        .then((response) => {
        setStudents(response.data)
        })
        .catch((error) => {
        console.log(error);
        })
        }

   let uniqueId = allStudents.length===0 ? 1 : allStudents[allStudents.length-1].StudentId+1

const getStudentName = event => {
setInputData({
    ...inputStudentData,
    studentName:event.target.value
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



const getStudentBranch = event => {
setInputData({
    ...inputStudentData,
    studentBranch:event.target.value
})
}


const getStudentClass = event => {
setInputData({
    ...inputStudentData,
    studentClass:event.target.value
})
}


const onSubmittingForm = event => {
event.preventDefault()
console.log(inputStudentData)
if(inputStudentData.studentName !== '' && inputStudentData.studentBranch !== '' && inputStudentData.studentClass !== ''){

    axios.post(`http://localhost:3000/add-student`,{
        StudentId:uniqueId,
        StudentName:inputStudentData.studentName,
        Branch:inputStudentData.studentBranch,
        Class:inputStudentData.studentClass
    }).then((response) => {
        console.log(response);
        uniqueId++
        Navigate('/')
        })
        .catch((error) => {
        console.log(error);
        });
}

}


return <div className='form-bg-container'>
<div className="modal-container add-bg-container"> 
<h2>Enter Student Details!</h2>
<form className='form-container' onSubmit={onSubmittingForm}>
   <label htmlFor='input-box'>Enter Student Name</label>
   <input type='text' id='input-box' onChange={getStudentName} value={inputStudentData.studentName} className="name-box"/>
   <label htmlFor='input-box-branch'>Select Student Branch</label>
   <select className='update-drop-down' id="input-box-branch" onChange={getStudentBranch}>
            <option value='' selected>Branches</option>
            {branchList.slice(1,branchList.length).map((eachItem,currInd) => <option value={eachItem.Branch} id={currInd} key={currInd}>{eachItem.Branch}</option> )}
        </select>
   <label htmlFor='input-box-class'>Enter Student Class</label>
   <input type='text' id='input-box-class' onChange={getStudentClass} value={inputStudentData.studentClass} className="name-box"/>
  <div className='form-btns-container'>
  <button type='submit' className='update-btn add-btn'>Add</button>
  <button onClick={() => {Navigate('/')}} className="update-btn cancel-btn">Cancel</button>
  </div>
</form>
</div>
<p className='warning'>*make sure fields should not be empty!</p>
</div>


}

export default AddStudent