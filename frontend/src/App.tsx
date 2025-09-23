
import './App.css'
import {  Route, Routes } from 'react-router-dom'; 
import Form from './component/Form'
import FormBuilder from './FormBuilder/FormBuilder'
import FieldSelector from './component/FieldSelector';
function App() {
  return (
   <>
   
   <Routes>
        <Route path="/FormBuilder" element={<FormBuilder />} />
        <Route path="/" element={<FieldSelector />} />
        {/* <Route path="/FieldSelector" element={< />} /> */}
   </Routes>
   
   </>
  )
}
export default App;
