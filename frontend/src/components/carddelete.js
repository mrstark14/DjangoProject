import React, {useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Deletecard( match ) {

    useEffect(() => {
        deleteCard();
    }, [])

    const deleteCard = () => {
        axios.delete(`http://127.0.0.1:8000/api/projectcard/${match.match.params.cardid}`, {
            headers : {
                "Authorization" : `Token ${Cookies.get("token")}`
            }
        }).then(
            (res) => {
                window.location.href = `http://127.0.0.1:3000/${match.match.params.projectid}/list/${match.match.params.listid}`
            }
        ).catch( err => {
            alert(err)
            window.location.href = `http://127.0.0.1:3000/${match.match.params.projectid}/list/${match.match.params.listid}`
        })
        
    }

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