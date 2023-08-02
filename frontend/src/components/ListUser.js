import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListUser() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserID, setSelectedUserID] = useState(null);
    const [isShow, invokeModal] = useState(false);

    const initModal = (id) => {
        invokeModal(!false);
        setSelectedUserID(() => id);
    }
    const closeModal = () => {
        invokeModal(false);
    }

    const getUserList = async () => {
        const res = await getUsers();
        if (res.data == null) {
            navigate('/')
            window.alert("No users found")
        }
        setUsers(res.data)
    }

    useEffect(() => {
        getUserList();
    }, [])

    const addUser = () => {
        navigate('/add-user/_add')
    }

    const viewUser = (id) => {
        navigate(`add-user/${id}`)
    }

    const editUserList = (id) => {
        navigate(`add-user/${id}`)
    }

    const deleteUserList = async (id) => {
        const res = await deleteUser(id);
        toast.success(res.data);
        invokeModal(false);
        setUsers(users.filter(user => user.id !== id))
    }

    return (
        <div>
            <h2 className="text-center">
                Users List</h2>
            <div className="d-flex flex-row">
                <button className="btn btn-primary"
                    onClick={addUser}> Add User</button>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> User First Name</th>
                            <th> User Last Name</th>
                            <th> User Email </th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                user =>
                                    <tr key={user.id}>
                                        <td> {user.firstName} </td>
                                        <td> {user.lastName}</td>
                                        <td> {user.email}</td>
                                        <td>
                                            <button onClick={() => editUserList(user.id)} className="btn btn-info">Update</button>
                                            <button style={{ marginLeft: "10px" }} className="btn btn-danger" data-toggle="modal" data-target="#deleteResortOwner" onClick={() => initModal(user.id)} >Delete</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewUser(user.id)} className="btn btn-info">View</button>

                                        </td>
                                    </tr>
                            )
                        }

                        <>
                            <Modal show={isShow}>
                                <Modal.Header closeButton onClick={closeModal}>
                                    <Modal.Title>Are you sure</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Do you really delete this user?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={() => deleteUserList(selectedUserID)}>
                                        Yes
                                    </Button>
                                    <Button variant="danger" onClick={closeModal}>
                                        No
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    </tbody>
                </table>
            </div>
        </div>
    )
}