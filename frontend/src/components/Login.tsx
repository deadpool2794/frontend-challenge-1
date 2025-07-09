import { Button, TextInput } from "@mantine/core"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import userStore from "~/store/UserInfo"
import ErrorDescription from "./ErrorDescription"
import { observer } from "mobx-react-lite"

const Login = () => {
    const [user, setUser] = useState({name:"", email:""})
    const [error, setError] = useState("")
    const navigate = useNavigate()
    
    const loginUser = () => {
        if(user.name.length === 0){
            setError("Name cannot be empty")
            return
        }
        if(user.email.length === 0){
            setError("Email cannot be empty")
            return
        }
        setError("");
        userStore.setUserInfo(user);
    }

    useEffect(() => {
        if(userStore.isLoggedIn){
            navigate("/")
        }

    }, [userStore.isLoggedIn])


    return <div className ="flex flex-col h-full items-center justify-center text-center px-96">
        <form className = "w-2/5 min-w-96 p-8 border-2 border-gray-200">
        <div className = "flex mb-4 justify-center">
            <TextInput onChange={(event) => setUser({...user, name:event.target.value})} value = {user.name} placeholder="Enter name" />  
        </div>

        <div className = "flex mb-4 justify-center">
            <TextInput onChange={(event) => setUser({...user, email:event.target.value})} value = {user.email} placeholder="Enter email" />  
        </div>
        {error.length > 0 && (
            <div className="mb-2 pl-12">
                <ErrorDescription error = {error} />
            </div>
        )}
        <Button onClick = {loginUser}>Login</Button>
        </form>
    </div>
}


export default observer(Login)