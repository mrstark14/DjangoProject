import React, { useEffect } from "react";
import Cookies from "js-cookie";

export default function Checklogin() {

    useEffect(() => {
        loginCheck();
    },[])

    const loginCheck = () => {
        if (Cookies.get("token")==null) {
            window.location.href = 'http://127.0.0.1:3000/login/'
        }
    }
    return (
        <>
        </>
    )
}