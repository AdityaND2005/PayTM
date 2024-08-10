import axios from "axios";
import { useEffect, useState } from "react";

const Appbar = ()=>{
    const [name, setName] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/dashboard",{
            headers: {
              'authorization': `Bearer ${localStorage.getItem("token")}`
            }
          }).then(
            (response)=>{setName(response.data.name)}
        )
    },[])
    return(
        <div className="flex justify-between h-14 shadow">
            <div className="flex items-center h-full ml-4">
            PayTM App
            </div>
            <div className="flex">
                <div className="flex items-center h-full mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-4">
                    <div className="flex items-center h-full text-xl">
                        {name}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appbar;