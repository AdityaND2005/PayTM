import axios from "axios";
import useSWR from 'swr';

const fetcher = async(url)=>{
    const response = await axios.get(url,{
        headers:{
            'authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.balance;
}
const Balance = ()=>{
    
    const {data,error,isLoading} = useSWR("http://localhost:3000/api/v1/account/balance",fetcher,{
        refreshInterval:1000
    });
    if (isLoading) return <div>Loading...</div>
    else if (error) return <div>Error loading balance</div>
    else return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {data}
        </div>
    </div>  
}

export default Balance;