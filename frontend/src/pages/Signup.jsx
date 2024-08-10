import { useRecoilState } from "recoil"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import { firstNameAtom, lastNameAtom, passwordAtom, usernameAtom } from "../store/atoms/Input"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export const Signup = ()=>{
    const [firstName,setFirstName] = useRecoilState(firstNameAtom);
    const [lastName ,setLastName] = useRecoilState(lastNameAtom);
    const [username, setUsername] = useRecoilState(usernameAtom);
    const [password, setPassword] = useRecoilState(passwordAtom);
    const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen flex justify-center items-center">
            <div className="flex flex-col bg-white shadow-xl p-5 px-8 text-center rounded-lg">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox onChange={(e)=>{setFirstName(e.target.value)}} label={"First Name"} placeholder={"Enter your first name"}/>
                <InputBox onChange={(e)=>{setLastName(e.target.value)}} label={"Last Name"} placeholder={"Enter your last name"}/>
                <InputBox onChange={(e)=>{setUsername(e.target.value)}} label={"Email"} placeholder={"Enter your email"}/>
                <InputBox onChange={(e)=>{setPassword(e.target.value)}} label={"Password"} placeholder={"Enter your password"} type={"password"}/>
                <Button onClick={async()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                        firstName,
                        lastName,
                        username,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    navigate("/signin");
                }} label={"Sign up"} />
                <BottomWarning label={"Already have an account?"} text={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    )
}