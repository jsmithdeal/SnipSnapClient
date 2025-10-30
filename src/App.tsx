import './App.css'
import LoginWrapper from './components/wrappers/LoginWrapper'
import CreateAccount from './components/SignUpForm'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { Bounce, ToastContainer } from 'react-toastify'
import MainWrapper from './components/wrappers/MainWrapper'
import SnipSnapContextProvider from './contexts/SnipSnapContext'
import ProtectedRoute from './components/route-protection/ProtectedRoute'
import { PAGE_ROUTES } from './utilities/configVariables'
import SnipsWrapper from './components/wrappers/SnipsWrapper'
import SettingsWrapper from './components/wrappers/SettingsWrapper'
import SnipDetailsWrapper from './components/wrappers/SnipDetailsWrapper'

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
          <Route path="*" element={<Navigate to={PAGE_ROUTES.userpages.root} replace />} />
          <Route path={ PAGE_ROUTES.accesspages.root } element={ <LoginWrapper /> }>
            <Route path={ PAGE_ROUTES.accesspages.login } element={ <LoginForm /> }/>
            <Route path={ PAGE_ROUTES.accesspages.createaccount } element={ <CreateAccount /> } />
          </Route>
          <Route
            path={PAGE_ROUTES.userpages.root} 
            element={
              <ProtectedRoute>
                <MainWrapper />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to={ PAGE_ROUTES.userpages.snips } replace />} />
            <Route path={ PAGE_ROUTES.userpages.snips } element={ <SnipsWrapper /> } />
            <Route path={ PAGE_ROUTES.userpages.createsnip } element={ <SnipDetailsWrapper /> } />
            <Route path={ PAGE_ROUTES.userpages.editsnip } element={ <SnipDetailsWrapper /> } />
            <Route path={ PAGE_ROUTES.userpages.settings } element={ <SettingsWrapper /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </SnipSnapContextProvider>
  )
}

export default App
