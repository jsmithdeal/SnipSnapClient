import './App.css'
import Login from './components/screens/Login'
import CreateAccount from './components/controls/SignUpForm'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import LoginForm from './components/controls/LoginForm'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
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
