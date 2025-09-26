import './App.css'
import Login from './components/screens/Login'
import CreateAccount from './components/controls/SignUpForm'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import LoginForm from './components/controls/LoginForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> }>
          <Route path='/' element={ <LoginForm /> }/>
          <Route path='/sign-up' element={ <CreateAccount /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
