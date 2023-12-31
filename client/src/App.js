import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector} from "react-redux";
import Loader from "./components/Loader";

function App() {
  const {loader} = useSelector(state => state.loaderReducer)
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}/>
      {loader && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home"
           element={
           <ProtectedRoute>
            <Home />
            </ProtectedRoute>
          }
           />

        </Routes></BrowserRouter>
    </div>
  );
}

export default App;
