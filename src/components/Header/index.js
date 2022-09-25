import { Link } from 'react-router-dom'

import './index.css'

const Header = (props) => <nav className='nav-bar'>
    <h2 className='nav-heading'>Alpine Code Task</h2>
    <div className='nav-buttons-container'>
    <button className='all-btn' onClick={() => {props.onGetAll();props.onResetDropdown()}}>All Students</button>
    <Link to='/add-student'><button className='all-btn new-btn'>Add New Student</button></Link>
    </div>
</nav>



export default Header