import './App.css'
import LoginWrapper from './components/wrappers/LoginWrapper'
import CreateAccount from './components/controls/SignUpForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/controls/LoginForm'
import { Bounce, ToastContainer } from 'react-toastify'
import MainWrapper from './components/wrappers/MainWrapper'
import SnipSnapContextProvider from './contexts/SnipSnapContext'
import ProtectedRoute from './components/route-protection/ProtectedRoute'
import { PAGE_ROUTES } from './utilities/configVariables'

function App() {
  return (
    <SnipSnapContextProvider>
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
          <Route path={ PAGE_ROUTES.accesspages.root } element={ <LoginWrapper /> }>
            <Route path={ PAGE_ROUTES.accesspages.login } element={ <LoginForm /> }/>
            <Route path={ PAGE_ROUTES.accesspages.createaccount } element={ <CreateAccount /> } />
          </Route>
          <Route
            path="*" 
            element={
              <ProtectedRoute>
                <MainWrapper />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </SnipSnapContextProvider>
  )
}

export default App
