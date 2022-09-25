import { BrowserRouter,Routes,Route } from "react-router-dom";

import GetAllStudents from "./components/GetAllStudents";

import UpdateStudent from "./components/UpdateStudent";

import AddStudent from './components/AddStudent'

const App = () => <BrowserRouter>
<Routes>
    <Route exact path='/' element = {<GetAllStudents />} />
    <Route exact path="/update-student/:id" element={<UpdateStudent />} />
    <Route exact path='/add-student' element={<AddStudent />} />
</Routes>
</BrowserRouter>

export default App