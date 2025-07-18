
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      <Toaster/>
      </BrowserRouter>
    </RecoilRoot>
  )
}


export default App
