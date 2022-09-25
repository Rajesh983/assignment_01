import { useState ,useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import { useParams} from 'react-router-dom';

import axios from 'axios';

import './index.css'

const UpdateStudent = () => {
    const id = useParams().id

    const Navigate = useNavigate()

    let [inputStudentData,setInputData] =useState({studentName:'',studentBranch:'',studentClass:''})

    let [branchList,setBranchList] = useState([])

    let [dropdownVal,setDropdownVal] = useState({optionId:''})

   useEffect(() => {
    axios.get(`http://localhost:3000/get-by-id/${id}`)
   .then(response => {
    setInputData({
        studentName:response.data.StudentName,
        studentBranch:response.data.Branch,
        studentClass:response.data.Class
    })
    setDropdownVal({optionId:response.data.Branch})
    console.log(response.data)
   })
   .catch(err => {
    console.log(err)
   })
   gettingBranchList()
   },[])

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

const getStudentName = event => {
setInputData({
    ...inputStudentData,
    studentName:event.target.value
})
}


const getStudentBranch = event => {
    console.log(event.target.value)
setInputData({
    ...inputStudentData,
    studentBranch:event.target.value
})
setDropdownVal({optionId:event.target.value})
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

    axios.post(`http://localhost:3000/update-student/${id}`,{
        StudentName:inputStudentData.studentName,
        Branch:inputStudentData.studentBranch,
        Class:inputStudentData.studentClass
    }).then((response) => {
        console.log(response);
        Navigate('/')
        })
        .catch((error) => {
        console.log(error);
        });
}

}



return <div className='form-bg-container'>
<div className="modal-container"> 
<h2>Enter Details to Update!</h2>
<form className='form-container' onSubmit={onSubmittingForm}>
   <label htmlFor='input-box'>Enter Student Name</label>
   <input type='text' id='input-box' onChange={getStudentName} value={inputStudentData.studentName} className="name-box"/>
   <label htmlFor='input-box-branch'>Select Branch</label>
   <select className='update-drop-down' value={dropdownVal.optionId} onChange={getStudentBranch}>
            {/* <option value='' selected>Select Branch</option> */}
            {branchList.slice(1,branchList.length).map((eachItem,currInd) => <option value={eachItem.Branch} id={currInd} key={currInd}>{eachItem.Branch}</option> )}
    </select>
   <label htmlFor='input-box-class'>Enter Student Class</label>
   <input type='text' id='input-box-class' onChange={getStudentClass} value={inputStudentData.studentClass} className="name-box"/>
  <div className='form-btns-container'>
  <button type='submit' className='update-btn'>Update</button>
  <button onClick={() => {Navigate('/')}} className="update-btn cancel-btn">Cancel</button>
  </div>
</form>
</div>
<p className='warning'>*make sure fields should not be empty!</p>
</div>


}

export default UpdateStudent