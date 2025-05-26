import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

function Login(){

    const INITIAL_LOGIN_OBJ = {
        password : "",
        emailId : ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")

        if(loginObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
        if(loginObj.password.trim() === "")return setErrorMessage("Password is required! (use any value)")
        else{
            setLoading(true)
            // Call API to check user credentials and save token in localstorage
            localStorage.setItem("token", "DumyTokenHere")
            setLoading(false)
            window.location.href = '/app/dashboard'
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLoginObj({...loginObj, [updateType] : value})
    }

    return(
        <div className="min-h-screen w-screen bg-base-200 flex items-center justify-center px-4">
        <div className="card w-full max-w-md shadow-xl bg-base-100 rounded-xl py-24 px-10">
        <div className="flex items-center justify-center mb-2">
            <img className="mask mask-squircle w-10 mr-2" src="/pngwing.png" alt="Logo"/>
            <h1 className="text-3xl font-bold">ProLine</h1>
        </div>
        <h2 className='text-2xl font-semibold mt-10 mb-4 text-center'>Login</h2>


            <form onSubmit={(e) => submitForm(e)}>

            <div className="mb-4">
                <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/>
                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue}/>
            </div>

            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

            </form>
        </div>
        </div>

    )
}

export default Login