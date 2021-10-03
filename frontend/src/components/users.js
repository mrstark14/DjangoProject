import React, {useState, useEffect} from "react";
import '../App.css'
import axios from 'axios'

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    },[]);

    const fetchUsers = async () => {
        axios.get('http://127.0.0.1:8000/api/user/').then(
            (res) => {
                setUsers(res.data)
            }
        ).catch(err => {
            console.log("Error")
        })
    };

    console.log(users)

    return (
        <div>
            <h1>Hello there</h1>
            {users.map(user => {
                return (
                    <>
                    Username : {user.username} Name : {user.name} Role : {user.role}
                    <br/>
                    </>
                )
                })}
        </div>
    );
}

export default User;