
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Form from './component/Form'
import FormBuilder from './FormBuilder/FormBuilder'
function App() {
  return (
   <>
   
   <Routes>
        <Route path="/FormBuilder" element={<FormBuilder />} />
        <Route path="/" element={<Form />} />
   </Routes>
   
   </>
  )
}
export default App;
