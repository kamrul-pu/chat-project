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
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
        <Route path='/chat' element={<><Sidebar /> <ChatArea /></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
