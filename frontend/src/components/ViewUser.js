    import React, { useState, useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import { getUserById } from '../services/UserService';

    export default function ViewUser() {
        const [ user, setUser ] = useState(null);
        const id = useParams().id;

        const getUser = async () => {
            const res = await getUserById(id)
            setUser(res.data);
        }
        
        useEffect(() => {
            getUser();
        }, [])

        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">
                        View User Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> User First Name: </label>
                            <div> {user?.firstName || ""} </div>
                        </div>
                        <div className="row">
                            <label> User Last Name: </label>
                            <div> {user?.lastName || ""} </div>
                        </div>
                        <div className="row">
                            <label> User Email : </label>
                            <div> {user?.email || ""} </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }