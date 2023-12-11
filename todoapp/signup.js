import React, {useState} from 'react'
import {userHistory} from 'react-router-dom'
function Register(){
    const [name, setName] = userState("")
    const [password, setPassword] = userState("")
    const [email, setEmail] = userState("")
    const history = userHistory();

    async function signUp(){
        let item = {name, password, email}
        console.warn(item)

        let result = await fetch("https://mockapi.io/clone/656eb2056529ec1c62367e28", {
            method: 'POST',
            body: JSON.stringify(item),
            headers:{
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result =result
        localStorage.setItem("user-info", JSON.stringify(result))
        history.push("/add")
    }
    return (
        <div className="box">
        <h1>Sign Up</h1>
        <input type="username" placeholder="Username" />
        <input type="e-mail" placeholder="E-mail" />
        <input type="password" placeholder="Password"/>
        <button className="btnfield">Sign Up</button>
                   
        </div>  
    )
}

