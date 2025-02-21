import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import './index.css'
import Home from './components/pages/Home'
import CoinBounce from './components/pages/CoinBounce'
import Crypto from './components/pages/Crypto'
import Blogs from './components/pages/Blogs'
import SubmitBlog from './components/pages/SubmitBlog'
import Login from './components/pages/login/Login'
import Logout from './components/pages/Logout'
import Signup from './components/pages/Signup'
import Protected from './components/protected/Protected'
import Error from './components/pages/Error'
import store from './store/index'
import { useSelector } from 'react-redux'



function App() {
  

  console.log("Redux Store:", store); 
console.log("Redux State:", store.getState()); 

const isAuth=useSelector((state)=>state.user.auth);
  return (
    <div className='mt-5'> 
    <BrowserRouter>
    <Navbar/>
    <Routes>
     
      <Route
      path='/coinbounce'
      exact
      element={<div className='flex-1'> <CoinBounce/></div>}
      />
       <Route
      path='/'
      exact
      element={ <Home/>}
      />
      <Route
      path='/crypto'
      exact
      element={<Crypto/>}
      />
       <Route
      path='/blogs'
      exact
      element={<Protected isAuth={isAuth}><Blogs/></Protected>}
      />
       <Route
      path='/submit'
      exact
      element={ <Protected isAuth={isAuth}> <SubmitBlog/>
      </Protected>}
      />
       <Route
      path='/login'
      exact
      element={ <Login/>}
      />
       <Route
      path='/logout'
      exact
      element={ <Logout/>}
      />
      <Route
      path='/signup'
      exact
      element={ <Signup/>}
      />
      <Route
      path='*'
      exact
      element={<Error/>}
      />
    </Routes>
    <Footer/>
    </BrowserRouter>
  
    </div>
  )
}

export default App