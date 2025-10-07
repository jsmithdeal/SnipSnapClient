import './App.css'
import LoginWrapper from './components/wrappers/LoginWrapper'
import CreateAccount from './components/controls/SignUpForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/controls/LoginForm'
import { Bounce, ToastContainer } from 'react-toastify'
import MainWrapper from './components/wrappers/MainWrapper'
import UserContextProvider from './contexts/UserContext'
import ProtectedRoute from './components/route-protection/ProtectedRoute'

function App() {
  return (
    <UserContextProvider>
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
          <Route path='/' element={ <LoginWrapper /> }>
            <Route path='/' element={ <LoginForm /> }/>
            <Route path='/login' element={ <LoginForm /> }/>
            <Route path='/sign-up' element={ <CreateAccount /> } />
          </Route>
          <Route
            path="/snipsnap" 
            element={
              <ProtectedRoute>
                <MainWrapper />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
