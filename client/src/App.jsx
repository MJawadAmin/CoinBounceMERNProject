import './index.css'
import Navbar from './components/Navbar/Navbar.jsx'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx'

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
   </Routes> 
  
    <Footer />
  </BrowserRouter>
    </div>
  )
}

export default App
