import { Router, Routes, Route } from "react-router-dom";

import EmailVerification from "./auth/EmailVerification";
import RegisterForm from "./auth/RegisterForm";

function App() {
 



  return (
    <Routes>
    
      <Route path="/" element={<EmailVerification />} />
      <Route path="/data-entry" element={<RegisterForm />} />
    
    </Routes>
  );
}

export default App;
