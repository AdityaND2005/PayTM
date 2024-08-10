import {Link} from "react-router-dom"
const BottomWarning = ({label, text, to})=>{
    return (
        <div className="py-2 text-sm flex justify-center">
            <div>{label}</div>
            <Link to={to} className="cursor pointer underline pl-1">
            {text}
            </Link>
        </div>
    )
}

export default BottomWarning;