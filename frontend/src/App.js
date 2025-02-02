import './App.css';
import Login from './Components/Login';
import Navigate from './Components/Navigate';
import Register from './Components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './Components/Sidebar';
import ChatArea from './Components/ChatArea';

function App() {
  return (
    <BrowserRouter>
      <Navigate />
      <hr />
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
        <Route path='/chat' element={<div className='row'><div className='col-lg-4 col-sm-12 col-md-6'><Sidebar /> </div> <div className='col-lg-8 col-sm-12 col-md-6'><ChatArea /></div></div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
