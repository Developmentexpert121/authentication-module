
import './App.css'
import {  Route, Routes } from 'react-router-dom'; 
import FormBuilder from './FormBuilder/FormBuilder'
import FieldSelector from './component/FieldSelector';
function App() {
  return (
   <>
   
   <Routes>
        <Route path="/FormBuilder" element={<FormBuilder />} />
        <Route path="/" element={<FieldSelector />} />
   </Routes>
   
   </>
  )
}
export default App;
