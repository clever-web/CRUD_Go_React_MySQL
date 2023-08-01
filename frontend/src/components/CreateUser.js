import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, createUser, updateUser } from '../services/UserService';

export default function CreateUserList() {

    const navigate = useNavigate();
    const id = useParams().id;
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const getUser = async () => {
        const res = await getUserById(id)
        const user = res.data;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
    }

    useEffect(() => {
        if (id === '_add') {
            return;
        } else {
            getUser();
        }
    })

    const saveOrUpdateUser = (e) => {
        e.preventDefault();
        const user = { firstName: firstName, lastName: lastName, email: email };
        console.log("user =>" + JSON.stringify(user));

        if (id === "_add") {
            createUser(user).then(res => {
                navigate('/');
            });
        } else {
            console.log(111)
            updateUser(user, id).then(res => {
                navigate('/');
            })
        }
    }

    const changeFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const changeLastName = (event) => {
        setLastName(event.target.value);
    }

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const cancel = () => {
        navigate('/users')
    }

    const getTitle = () => {
        if (id === '_add') {
            return <h3 className="text-center">Add User</h3>
        } else {
            return <h3 className="text-center">Update User</h3>
        }
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            getTitle()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> First Name: </label>
                                    <input placeholder="First Name"
                                        name="firstName" className="form-control"
                                        value={firstName}
                                        onChange={changeFirstName} />
                                </div>
                                <div className="form-group">
                                    <label> Last Name: </label>
                                    <input placeholder="Last Name"
                                        name="lastName" className="form-control"
                                        value={lastName}
                                        onChange={changeLastName} />
                                </div>
                                <div className="form-group">
                                    <label> Email : </label>
                                    <input placeholder="Email Address"
                                        name="email" className="form-control"
                                        value={email}
                                        onChange={changeEmail} />
                                </div>

                                <button className="btn btn-success"
                                    onClick={saveOrUpdateUser}>Save
                                </button>
                                <button className="btn btn-danger"
                                    onClick={cancel}
                                    style={{ marginLeft: "10px" }}>Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}