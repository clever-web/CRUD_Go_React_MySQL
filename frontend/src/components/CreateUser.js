import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserById, createUser, updateUser } from '../services/UserService';
import { validateEmail } from '../utils/validateForm';

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
    }, [])

    const validateFormData = () => {
        if (firstName && lastName && email && validateEmail(email)) {
            return true;
        } else {
            if(!firstName)
                toast.error("First Name is required!")
            if(!lastName)
                toast.error("Last Name is required!")
            if(!email) 
                toast.error("Email is required!")
            if(!validateEmail(email))
                toast.error("Email Format is not correct")
            return false;
        }
    }

    const saveOrUpdateUser = (e) => {
        e.preventDefault();
        const user = { firstName: firstName, lastName: lastName, email: email };
        console.log("user =>" + JSON.stringify(user));

        if (id === "_add") {
            if (validateFormData()) {
                createUser(user).then(res => {
                    toast.success(res.data)
                    navigate('/');
                });
            } else {
                navigate('/add-user/_add');
            }
            
        } else {
            if (validateFormData()) {
                updateUser(user, id).then(res => {
                    toast.success(res.data)
                    navigate('/');
                })
            } else {
                navigate(`/add-user/${id}`);
            }
            
        }
    }

    const cancel = () => {
        navigate('/')
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
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label> Last Name: </label>
                                    <input placeholder="Last Name"
                                        name="lastName" className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label> Email : </label>
                                    <input placeholder="Email Address"
                                        name="email" className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
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