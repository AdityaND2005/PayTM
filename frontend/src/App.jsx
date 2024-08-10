import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { Send } from "./pages/Send"
import { RecoilRoot } from "recoil"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<RecoilRoot><Signup /></RecoilRoot>} />
          <Route path="/signin" element={<RecoilRoot><Signin /></RecoilRoot>} />
          <Route path="/dashboard" element={<RecoilRoot><Dashboard /></RecoilRoot>} />
          <Route path="/send" element={<RecoilRoot><Send /></RecoilRoot>} />
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
