import React, { useEffect, useState } from "react";
import "./userDetails.css";
import { generatePassword, getUserRole } from "../Common/common";
import { Head, Link, router } from "@inertiajs/react";
import SuccessModal from "../Components/SuccessModal";
// import ModalSuccess from "../Components/ModalSuccess";

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
    const [showSuccess, setShowSuccess] = useState(false);

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
        if (props.message) {
            if (props.message.includes("success")) {
                setShowSuccess(true);
            }
        }
    }, [props]);

    return (
        <div className="user-details">
            <Head title={`${props.appName} | User Details`}/>
            {/* <!-- iOS-style Navbar (User Details Page) --> */}
            <nav className="navbar navbar-ios sticky-top px-2" style={{ backgroundColor: "#e3f2fd", height: "60px" }}>
                <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
                    {/* <!-- Left Back Button --> */}
                    <Link
                        href="/users"
                        className="btn btn-link text-decoration-none p-0"
                    >
                        <i className="bi bi-chevron-left fs-5 text-primary"></i>
                    </Link>

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
                                <Link
                                    className="dropdown-item"
                                    href={`/users/${user.id}/edit`}
                                >
                                    Edit User
                                </Link>
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
                {/* <ModalSuccess
                    show={showSuccess}
                    onClose={() => setShowSuccess(false)}
                    message="Success"
                /> */}
            </div>
            <SuccessModal
                show={showSuccess}
                onClose={() => setShowSuccess(false)}
                message={props.message}
            />
        </div>
    );
};

export default UserDetails;
