import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Result from "./pages/Result"
import bgImage from "./assets/background.jpg"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login"
import { useAppContext } from "./Context/AppContext"
import Loader from "./utils/Loader"

function App() {

  const {showLogin,loading}=useAppContext();



  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen object-cover "
    style={{backgroundImage:`url(${bgImage})`}}>
      {
        loading && <Loader/>
      }
      <NavBar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/Result" element={<Result/>} />
      </Routes>

      <Footer/>
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
/>
    </div>
  )
}

export default App
