import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"

export const Dashboard = ()=>{
    return (
        <div>
            <Appbar />
            <div className="m-4 shadow">
                <Balance/>
                <Users />
            </div>
            
        </div>
    )
}