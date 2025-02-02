import './index.css'
import Navbar from './components/Navbar/Navbar.jsx'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx'
import CoinBounce from './Pages/CoinBounce.jsx'
import Protected from './components/Protected/Protected.jsx'

function App() {
  

  return (
    <div> 

     <BrowserRouter>
     <Navbar />

     <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="dashboard" element={}>
        {/* <Route index element={<RecentActivity />} /> */}
      {/* </Route> */}
      {/* <Route path="footer" element={} />  */}
      <Route path='coinbounce' exact element={<CoinBounce/>} />
      <Route path='/' exact element={<div className='text-9xl text-center h-[100vh] w-full bg-blue-400 mt-8'> Coin Bounce Home page </div>} />
      <Route path='crypto' exact element={<div className='text-9xl text-center h-[100vh] w-full bg-blue-400 mt-8'> Coin Bounce crypto page </div>} />
      <Route path='blogs' exact element={<div className='text-9xl text-center h-[100vh] w-full bg-blue-400 mt-8'> Coin Bounce  blogs page </div>} />
      <Route path='submit' exact element={<div className='text-9xl text-center h-[100vh] w-full bg-blue-400 mt-8'> Coin Bounce  submit page </div>} />
      <Route path='login' exact element={<div className='text-9xl text-center h-[100vh] w-full bg-blue-400 mt-8'> Login page </div>} />
      <Route path='signup' exact element={<div className='text-9xl text-center h-[100vh] w-full bg-blue-400 mt-8'> signup page </div>} />
   </Routes> 
  
  
    <Footer />
  </BrowserRouter>
    </div>
  )
}

export default App
