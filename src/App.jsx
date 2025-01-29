import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/SIdebar';
import ExpensesAndIncomes from './pages/ExpensesAndIncomes';
import Home from './pages/Home';

function App() {

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>

      {/* El background */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80'/>
        <div className='absolute inset-0 backdrop-blur-sm'/>
      </div>

      {/* El Menu del Costado Izquierdo(barra lateral->SideBar) */}
      <Sidebar />

      <Routes>
        <Route path='/' element={<Home />}/> 
        <Route path='/expensesandincomes' element={<ExpensesAndIncomes />}/> 
      </Routes>
     </div> 
    )
}

export default App
