import { useRecoilState } from "recoil"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import { passwordAtom, usernameAtom } from "../store/atoms/Input"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signin = ()=>{
    const [username, setUsername] = useRecoilState(usernameAtom);
    const [password, setPassword] = useRecoilState(passwordAtom);
    const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen flex justify-center items-center">
            <div className="flex flex-col bg-white shadow-xl p-5 px-8 text-center rounded-lg">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={(e)=>{setUsername(e.target.value)}} label={"Email"} placeholder={"Enter your email"}/>
                <InputBox onChange={(e)=>{setPassword(e.target.value)}} label={"Password"} type={'password'} placeholder={"Enter your password"}/>
                <Button onClick={async()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                        username,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard");
                }} label={"Sign In"} />
                <BottomWarning label={"Don't have an account?"} text={"Sign up"} to={"/"}/>
            </div>
        </div>
    )
   
}