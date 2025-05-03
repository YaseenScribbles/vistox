import React from "react";
import "./dashboard.css";
import { useForm, Link, Head } from "@inertiajs/react";

const Dashboard = (props) => {
    const { post } = useForm();

    return (
        <>
            <Head title={`${props.appName} | Dashboard`} />
            <nav className="navbar navbar-light bg-white shadow-sm w-100 px-3 sticky-top justify-content-center">
                <img
                    src="https://essa.in/cdn/shop/files/ESSA_LOGO_New_black-font_af80b8c9-e0de-4a0a-924c-dd0c9db3c862.png?v=1740131920&width=120"
                    alt="Logo"
                    height="40"
                />
            </nav>

            {/*  📱 Dashboard Menu Grid  */}
            <div className="container-fluid p-4">
                {/*  👤 Enhanced User Info  */}
                <div className="d-flex align-items-center p-3 mb-4 rounded-3 shadow-sm bg-white">
                    <div
                        className="rounded-circle bg-primary text-white shadow d-flex justify-content-center align-items-center"
                        style={{ width: "44px", height: "44px" }}
                    >
                        <i
                            className="bi bi-person-fill"
                            style={{ fontSize: "1.25rem" }}
                        ></i>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0 fw-semibold">
                            Hi, {props.auth.user.name}
                        </h6>
                        <small className="text-muted">
                            Welcome to your dashboard
                        </small>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-6 col-md-4">
                        <Link href="/users/create" className="menu-link">
                            <div className="menu-card text-white bg-gradient-primary">
                                <div className="menu-icon">
                                    <i className="bi bi-person-plus-fill"></i>
                                </div>
                                <div className="menu-label">Add User</div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-6 col-md-4">
                        <Link href="/users" className="menu-link">
                            <div className="menu-card text-white bg-gradient-info">
                                <div className="menu-icon">
                                    <i className="bi bi-people-fill"></i>
                                </div>
                                <div className="menu-label">My Users</div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-6 col-md-4">
                        <Link href="/contacts/create" className="menu-link">
                            <div className="menu-card text-white bg-gradient-success">
                                <div className="menu-icon">
                                    <i className="bi bi-person-lines-fill"></i>
                                </div>
                                <div className="menu-label">Add Contact</div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-6 col-md-4">
                        <Link href="/contacts" className="menu-link">
                            <div className="menu-card text-white bg-gradient-secondary">
                                <div className="menu-icon">
                                    <i className="bi bi-journal-bookmark"></i>
                                </div>
                                <div className="menu-label">My Contacts</div>
                            </div>
                        </Link>
                    </div>

                    {/*  🆕 Add New Order  */}
                    <div className="col-6 col-md-4">
                        <Link href="/orders/create" className="menu-link">
                            <div className="menu-card text-white bg-gradient-warning">
                                <div className="menu-icon">
                                    <i className="bi bi-cart-plus-fill"></i>
                                </div>
                                <div className="menu-label">Add Order</div>
                            </div>
                        </Link>
                    </div>

                    {/*  📋 My Orders  */}
                    <div className="col-6 col-md-4">
                        <Link href="/orders" className="menu-link">
                            <div className="menu-card text-white bg-gradient-purple">
                                <div className="menu-icon">
                                    <i className="bi bi-clipboard-check-fill"></i>
                                </div>
                                <div className="menu-label">My Orders</div>
                            </div>
                        </Link>
                    </div>

                    {/*  🆕 New Visit  */}
                    {/* <div className="col-6 col-md-4">
                        <a href="add-new-visit.html" className="menu-link">
                            <div
                                className="menu-card text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #3a9c9e, #2a6d6f)",
                                }}
                            >
                                <div className="menu-icon">
                                    <i className="bi bi-calendar-plus"></i>
                                </div>
                                <div className="menu-label">New Visit</div>
                            </div>
                        </a>
                    </div> */}

                    {/*  📋 My Visits  */}
                    {/* <div className="col-6 col-md-4">
                        <a href="my-visits.html" className="menu-link">
                            <div
                                className="menu-card text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #8c9d9f, #3a4c51)",
                                }}
                            >
                                <div className="menu-icon">
                                    <i className="bi bi-calendar-check"></i>
                                </div>
                                <div className="menu-label">My Visits</div>
                            </div>
                        </a>
                    </div> */}

                    <div className="col-12 col-md-4">
                        <Link
                            href="#"
                            className="menu-link"
                            onClick={() =>
                                post("/logout", {}, { replace: true })
                            }
                        >
                            <div className="menu-card text-white bg-gradient-danger">
                                <div className="menu-icon">
                                    <i className="bi bi-box-arrow-right"></i>
                                </div>
                                <div className="menu-label">Logout</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <footer className="text-center text-muted py-3 small">
                &copy; {new Date().getFullYear()} ESSA Garments. All rights reserved.
            </footer>
        </>
    );
};

export default Dashboard;
