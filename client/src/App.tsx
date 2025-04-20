
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/pages/Landing'
import './App.css'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/pages/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </RecoilRoot>
      <Toaster/>
    </BrowserRouter>
  )
}


export default App
