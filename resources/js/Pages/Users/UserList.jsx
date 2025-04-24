import React, { useEffect, useState } from "react";
import "./userList.css";
import { v4 as uuid } from "uuid";
import { getUserRole } from "../Common/common";
import { Head, Link } from "@inertiajs/react";

const UserList = (props) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [loading, setLoading] = useState(true);

    const filterUsers = (e) => {
        e.preventDefault();
        if (filterText) {
            const filteredUsers = users.filter((user) =>
                user.name.toLowerCase().includes(filterText.toLowerCase())
            );
            setFilteredUsers(filteredUsers);
        }
    };

    useEffect(() => {
        if(!filterText && users.length > 0){
            setFilteredUsers(users)
        }
    }, [filterText])

    useEffect(() => {
        if (props.users) {
            setUsers(props.users);
            setFilteredUsers(props.users);
            setLoading(false);
        }
    }, [props]);

    return (
        <div className="user-list">
            <Head title={`${props.appName} | User List`} />
            {/* <!-- Navbar --> */}
            <nav className="navbar navbar-light navbar-ios sticky-top px-2">
                <div className="container-fluid d-flex justify-content-between align-items-center position-relative">
                    {/* <!-- Left Button --> */}
                    <Link
                        href="/dashboard"
                        className="btn btn-link text-decoration-none p-0"
                    >
                        <i className="bi bi-chevron-left fs-5"></i>
                    </Link>

                    {/* <!-- Center Title --> */}
                    <span className="navbar-title mx-auto">User List</span>

                    {/* <!-- Right Button --> */}
                    <Link
                        href="/users/create"
                        className="btn btn-link text-decoration-none p-0"
                    >
                        <i className="bi bi-person-plus fs-5"></i>
                    </Link>
                </div>
            </nav>

            {/* <!-- Search Box --> */}
            <div className="search-container">
                <form className="d-flex gap-2" onSubmit={filterUsers}>
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search users..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-primary">
                        <i className="bi bi-search"></i>
                    </button>
                </form>
            </div>

            <div className="container h-100 py-3">
                <div className={`list-container ${loading ? "" : "d-none"}`}>
                    <div className="loading-indicator">
                        <div className="text-center">
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>
                            <div className="mt-2">Loading users...</div>
                        </div>
                    </div>
                </div>

                <div className="list-group">
                    {/* <!-- User Item --> */}

                    {filteredUsers.map((user) => (
                        <Link
                            key={uuid()}
                            href={`/users/${user.id}`}
                            className="list-group-item list-group-item-action"
                        >
                            <div className="fw-semibold">{user.name}</div>
                            <div className="user-meta">
                                {user.email} • {user.phone}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-1">
                                <small className="text-muted">
                                    {getUserRole(user.role)}
                                </small>
                                <span
                                    className={`user-status ${
                                        user.active
                                            ? "status-active"
                                            : "status-suspended"
                                    }`}
                                >
                                    {user.active ? "Active" : "Suspended"}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div
                    className={`list-container ${
                        filteredUsers.length > 0 ? "d-none" : "d-flex"
                    } justify-content-center align-items-center`}
                >
                    <p className="text-body-secondary">No results</p>
                </div>
            </div>
        </div>
    );
};

export default UserList;
