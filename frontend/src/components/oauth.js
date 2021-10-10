import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Oauth() {
    const [loggedin, setLogin] = useState(false)
    const params = new URLSearchParams(window.location.search);
    const auth = params.get("code");

    useEffect(() => {
        fetchUser();
    },[]);

    const fetchUser = async () => {
        await axios.get(`http://127.0.0.1:8000/?code=${auth}&state=RANDOM_STATE_STRING`, {withCredentials: true})
        .then((response) => {
            Cookies.set('token', response.data['token'], {path:"/"})
            Cookies.set('username', response.data['username'], {path:"/"})
            Cookies.set('csrftoken', response.data['csrftoken'], {path:"/"})
            Cookies.set('sessionid', response.data['sessionid'], {path:"/"})
            console.log(response.data)
            setLogin(true)
            window.location.href = 'http://127.0.0.1:3000/dashboard/'
        }).catch(err => {
            alert(err)
        })
    };

    return (
        <>
        </>
    )
}