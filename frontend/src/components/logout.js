import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Logoutfunc(){
    useEffect(()=>{
        logout();
    },[])

    const logout = ()  => {
        axios.get('http://127.0.0.1:8000/logout/', {withCredentials: true}).then(
          (res) => {
            Cookies.remove('token');
            Cookies.remove('csrftoken');
            Cookies.remove('sessionid');
            Cookies.remove('username')
            console.log(res.data)
            window.location.href = 'http://127.0.0.1:3000/login'
          }
        ).catch(err => {
          alert('Error faced while logging out')
        })
    };
    
    return (
        <>
        </>
    )
}