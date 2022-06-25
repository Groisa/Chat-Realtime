import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth } from "./Services/firebase";
import { Homeview } from "./Views/Home";
import { LoginPage } from "./Views/LoginPage";



function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const loginGoogle = async () => {
       onAuthStateChanged(auth,  (user) => {
        if(!user) {
          navigate('/login')
        } else {
          navigate('/')
        }
      })
    }
    loginGoogle()
  }, [])
 
  return (
    <Routes>
      <Route path="/" element={<Homeview/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;

