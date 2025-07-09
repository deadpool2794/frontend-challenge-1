import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

const Header = () => {
    return <div className = "fixed left-0 right-0 h-20 flex items-center border-b-2 border-gray-200 px-96 justify-between">
        <Link to ='/' className = "font-extrabold text-2xl">ehs</Link>
        <Button>Login</Button>
    </div>
}

export default Header