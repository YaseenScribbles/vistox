import React, {  useState } from "react";
import "./addUser.css";
import { Head, Link, useForm } from "@inertiajs/react";
import { states } from "../Common/common";
import { v6 as uuid } from "uuid";

const EditUser = (props) => {
    const { post, data, setData, errors, processing } = useForm({
        id: props.user.id,
        role: props.user.role,
        name: props.user.name,
        email: props.user.email,
        phone: props.user.phone,
        district: props.user.district,
        state: props.user.state,
        manager: props.user.manager,
        agent: props.user.agent,
        // password: "",
    });
    const [managers, setManagers] = useState([]);

    const handleChange = (key, value) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/users/${data.id}?_method=PUT`, {
            onSuccess: () => {
                setData({
                    id: "",
                    role: "",
                    name: "",
                    email: "",
                    phone: "",
                    district: "",
                    state: "",
                    manager: "",
                    agent: "",
                    // password: "",
                });
            },
        });
    };

    // const setPassword = () => {
    //     handleChange("password", generatePassword());
    // };

    // useEffect(() => {
    //     if (props.managers) {
    //         setManagers(props.managers);
    //     }
    //     if (props.user) {
    //         setData({
    //             id: props.user.id,
    //             role: props.user.role,
    //             name: props.user.name,
    //             email: props.user.email,
    //             phone: props.user.phone,
    //             district: props.user.district,
    //             state: props.user.state,
    //             manager: props.user.manager,
    //             agent: props.user.agent,
    //             password: "",
    //         });
    //     }
    // }, [props]);

    return (
        <div className="edit-user">
            <Head title={`${props.appName} | Edit User`} />
            {/* <!-- iOS-style Navbar (Add User Page) --> */}
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
                    <span className="navbar-title">Edit User</span>

                    {/* <!-- Right Save Button --> */}
                    {/* <button
                        className="btn btn-link text-decoration-none p-0"
                        type="submit"
                        form="editUserForm"
                    >
                        <i className="bi bi-check2 text-primary fs-5"></i>
                    </button> */}
                </div>
            </nav>

            <div className="container py-2">
                <div className="form-section">
                    <form id="editUserForm" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">User Role</label>
                            <select
                                className={`form-select ${
                                    errors.role ? "is-invalid" : ""
                                }`}
                                value={data.role}
                                onChange={(e) =>
                                    handleChange("role", e.target.value)
                                }
                            >
                                <option value={""} disabled>
                                    Select role
                                </option>
                                <option value={"admin"}>Administrator</option>
                                <option value={"manager"}>Sales Manager</option>
                                <option value={"representative"}>
                                    Sales Representative
                                </option>
                            </select>
                            {errors.role && (
                                <div className="invalid-feedback">
                                    {errors.role}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.name ? "is-invalid" : ""
                                }`}
                                placeholder="Enter full name"
                                value={data.name}
                                onChange={(e) =>
                                    handleChange(
                                        "name",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                            {errors.name && (
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${
                                    errors.email ? "is-invalid" : ""
                                }`}
                                placeholder="Enter email"
                                value={data.email}
                                onChange={(e) =>
                                    handleChange("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="tel"
                                className={`form-control ${
                                    errors.phone ? "is-invalid" : ""
                                }`}
                                placeholder="Enter phone number"
                                value={data.phone ?? ""}
                                onChange={(e) =>
                                    handleChange("phone", e.target.value)
                                }
                            />
                            {errors.phone && (
                                <div className="invalid-feedback">
                                    {errors.phone}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">District</label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.district ? "is-invalid" : ""
                                }`}
                                placeholder="Enter district"
                                value={data.district ?? ""}
                                onChange={(e) =>
                                    handleChange(
                                        "district",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                            {errors.district && (
                                <div className="invalid-feedback">
                                    {errors.district}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">State</label>
                            <select
                                className={`form-select ${
                                    errors.state ? "is-invalid" : ""
                                }`}
                                value={data.state}
                                onChange={(e) =>
                                    handleChange("state", e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select state
                                </option>
                                {states.map((state) => (
                                    <option key={uuid()} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {errors.state && (
                                <div className="invalid-feedback">
                                    {errors.state}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Agent</label>
                            <select
                                className={`form-select ${
                                    errors.agent ? "is-invalid" : ""
                                }`}
                                value={data.agent ?? ""}
                                onChange={(e) =>
                                    handleChange("agent", e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select agent
                                </option>
                                <option value="">Not Applicable</option>
                                <option value="Agent 1">Agent 1</option>
                                <option value="Agent 2">Agent 2</option>
                                <option value="Agent 3">Agent 3</option>
                                {/* <!-- Populate dynamically later --> */}
                            </select>
                            {errors.agent && (
                                <div className="invalid-feedback">
                                    {errors.agent}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Sales Manager</label>
                            <select
                                className={`form-select ${
                                    errors.manager ? "is-invalid" : ""
                                }`}
                                value={data.manager ?? ""}
                                onChange={(e) =>
                                    handleChange("manager", e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select sales manager
                                </option>
                                <option value="">Not Applicable</option>
                                {managers.map((manager) => (
                                    <option key={uuid()} value={manager.id}>
                                        {manager.name}
                                    </option>
                                ))}

                                {/* <!-- Populate dynamically later --> */}
                            </select>
                            {errors.manager && (
                                <div className="invalid-feedback">
                                    {errors.manager}
                                </div>
                            )}
                        </div>

                        {/* <div className="mb-4">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.password ? "is-invalid" : ""
                                    }`}
                                    id="password"
                                    placeholder="Enter password"
                                    value={data.password}
                                    onChange={(e) =>
                                        handleChange("password", e.target.value)
                                    }
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={setPassword}
                                    title="Generate Password"
                                >
                                    <i className="bi bi-stars"></i>
                                </button>
                            </div>
                            {errors.password && (
                                <div className="invalid-feedback">
                                    {errors.password}
                                </div>
                            )}
                        </div> */}

                        <div className="d-grid">
                        <button
                                className="btn btn-primary"
                                type="submit"
                                id="saveButton"
                                disabled={processing}
                            >
                                {processing ? (
                                    <div
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                ) : (
                                    "Update User"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
