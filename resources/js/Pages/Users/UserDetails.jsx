import React, { useEffect, useState } from "react";
import "./userDetails.css";
import { generatePassword, getUserRole } from "../Common/common";
import { router } from "@inertiajs/react";

const UserDetails = (props) => {
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        role: "",
        phone: "",
        district: "",
        state: "",
        agent: "",
        manager: {
            id: "",
            name: "",
        },
        active: "",
    });

    const changeStatus = () => {
        if (user.id) {
            router.post(`/users/${user.id}?_method=DELETE`);
        }
    };

    const sendPassword = () => {
        const password = generatePassword();
        router.post(`/mail-password/${user.id}`, {
            password,
        });
    };

    useEffect(() => {
        if (props.user) {
            setUser(props.user);
        }
    }, [props]);

    return (
        <div className="user-details">
            {/* <!-- iOS-style Navbar (User Details Page) --> */}
            <nav className="navbar navbar-light navbar-ios sticky-top px-2">
                <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
                    {/* <!-- Left Back Button --> */}
                    <a
                        href="/dashboard"
                        className="btn btn-link text-decoration-none p-0"
                    >
                        <i className="bi bi-chevron-left fs-5 text-primary"></i>
                    </a>

                    {/* <!-- Center Title --> */}
                    <span className="navbar-title">User Details</span>

                    {/* <!-- Right Dropdown (Three-dot icon) --> */}
                    <div className="dropdown">
                        <a
                            href="#"
                            className="btn btn-link text-decoration-none p-0"
                            data-bs-toggle="dropdown"
                        >
                            <i className="bi bi-three-dots-vertical fs-5 text-primary"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a
                                    className="dropdown-item"
                                    href={`/users/${user.id}/edit`}
                                >
                                    Edit User
                                </a>
                            </li>
                            <li>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={sendPassword}
                                >
                                    Send Password
                                </a>
                            </li>
                            <li>
                                <a
                                    className={`dropdown-item ${
                                        user.active == "1"
                                            ? "text-danger"
                                            : "text-success"
                                    }`}
                                    href="#"
                                    onClick={changeStatus}
                                >
                                    {user.active == "1"
                                        ? "Deactivate"
                                        : "Activate"}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* <!-- Content --> */}
            <div className="container py-3">
                <div className="list-group rounded shadow-sm">
                    <div className="list-group-item">
                        <span className="list-label">User Role</span>
                        <span className="list-value">
                            {getUserRole(user.role)}
                        </span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Name</span>
                        <span className="list-value">{user.name}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Email</span>
                        <span className="list-value">{user.email}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Phone</span>
                        <span className="list-value">{user.phone}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">District</span>
                        <span className="list-value">{user.district}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">State</span>
                        <span className="list-value">{user.state}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Agent</span>
                        <span className="list-value">{user.agent}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Sales Manager</span>
                        <span className="list-value">
                            {user.manager && user.manager.name}
                        </span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Status</span>
                        <span
                            className={`badge ${
                                user.active ? "bg-success" : "bg-danger"
                            }`}
                        >
                            {user.active ? "Active" : "Suspended"}
                        </span>
                        {/* <!-- <span className="badge bg-danger">Suspended</span> --> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
