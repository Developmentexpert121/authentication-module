import { Router, Routes, Route } from 'react-router-dom';
import SignUp from './auth/Signup';
import SignIn from './auth/Signin';
import './App.css'
import ResetPassword from './auth/ResetPassword';
import EmailVerification from './auth/Emailverification';
import RegisterForm from './auth/RegisterForm';
function App() {
  return (
    
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset-password/:token"element={<ResetPassword/>}/>
        {/* <Route path="*" element={<SignUp />}/> */}
        <Route path='/EmailVerification' element={<EmailVerification/>}/>
        <Route path='/data-entry' element={<RegisterForm/>}/>
      </Routes>
   
  );
}

export default App;
