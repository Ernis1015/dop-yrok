import React from 'react';
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import axios from "axios";


function Users(props) {
    const {
        handleSubmit,
        register,
        reset
    } = useForm()
    const [users, setAddUsers] = useState([]);
    const [user, setAddUser] = useState({});

    useEffect(() => {
        getUser()
    }, []);

    async function getUser() {
        const response = await axios.get("http://localhost:8001/users")
        setAddUsers(response.data)
    }

    async function submit(values) {
        const response = await axios.post("http://localhost:8001/users", values)
        getUser()
        reset();
        modalF()
    }

    async function deleteUser(id) {
        const response = await axios.delete(`http://localhost:8001/users/${id}`)
        getUser()
        modalT()
    }

//модальное окна

    const modalOne = document.querySelector('.modalOne')
    const modalTwo = document.querySelector('.modalTwo')

    function modalF() {
        modalOne.style.display = "block";
    }

    function modalT() {
        modalTwo.style.display = "block";
    }

    function closeModalOne() {
        const closeOne = document.querySelector('#closeOne')
        modalOne.style.display = "none";
    }

    function closeModalTwo() {
        const closeOne = document.querySelector('#closeTwo')
        modalTwo.style.display = "none";
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder="NAME" {...register("name")}/>
                <input type="text" placeholder="EMAIL" {...register("email")}/>
                <input type="text" placeholder="USERNAME" {...register("username")}/>
                <button type={"submit"}>create</button>
            </form>
            <div className="table">
                <ol>name</ol>
                <ol>email</ol>
                <ol>username</ol>
                <ol>actions</ol>
            </div>
            {
                users.length > 0 ?
                    users.map(user => (
                        <li key={user.id} className="user">
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                            <div>{user.username}</div>
                            <button onClick={() => deleteUser(user.id)} className="delete_btn">delete</button>
                        </li>
                    ))
                    :
                    <p>таблица пуста</p>
            }
            <div className="modalOne">
                <div className="modal">
                    <h2 className="modal_create">User created successfully!</h2>
                    <span onClick={closeModalOne} id="closeOne">close</span>
                </div>
            </div>
            <div className="modalTwo">
                <div className="modal">
                    <h2 className="modal_delete">User deleted successfully!</h2>
                    <span onClick={closeModalTwo} id="closeTwo">close</span>
                </div>
            </div>
        </div>
    );
}

export default Users;