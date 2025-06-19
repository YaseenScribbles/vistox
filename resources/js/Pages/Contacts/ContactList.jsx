import { Head, Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import "./ContactList.css";
import { v6 as uuid } from "uuid";

const ContactList = (props) => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [filterText, setFilterText] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (filterText) {
            const filteredContacts = contacts.filter((c) =>
                c.shop_name.toLowerCase().includes(filterText.toLowerCase())
            );
            setFilteredContacts(filteredContacts);
        }
    };

    useEffect(() => {
        if (props.contacts) {
            setContacts(props.contacts);
            setFilteredContacts(props.contacts);
        }
    }, [props]);

    useEffect(() => {
        if (!filterText && contacts.length > 0) {
            setFilteredContacts(contacts);
        }
    }, [filterText]);

    return (
        <div className="contact-list">
            <Head title={`${props.appName} | Contact List`} />
            {/* <!-- Navbar --> */}
            <nav className="navbar navbar-ios sticky-top px-2" style={{ backgroundColor: "#e3f2fd", height: "60px" }}>
                <div className="container-fluid d-flex justify-content-between align-items-center position-relative">
                    <Link
                        href="/dashboard"
                        className="btn btn-link text-decoration-none p-0"
                    >
                        <i className="bi bi-chevron-left fs-5"></i>
                    </Link>
                    <span className="navbar-title mx-auto">Contact List</span>
                    <Link
                        href="/contacts/create?from=contacts"
                        className="btn btn-link text-decoration-none p-0"
                    >
                        <i className="bi bi-person-plus fs-5"></i>
                    </Link>
                </div>
            </nav>

            {/* <!-- Search --> */}
            <div className="search-container">
                <form className="d-flex gap-2" onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search contacts..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-primary">
                        <i className="bi bi-search"></i>
                    </button>
                </form>
            </div>

            {/* <!-- Contact List --> */}
            <div className="container py-3">
                <div className="list-group">
                    {/* <!-- Contact Item --> */}
                    {filteredContacts.map((contact) => (
                        <Link
                            key={uuid()}
                            href={`/contacts/${contact.id}`}
                            className="list-group-item list-group-item-action"
                        >
                            <div className="fw-semibold">
                                {contact.shop_name}
                            </div>
                            <div className="contact-meta">
                                Mr. {contact.contact_person}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-1">
                                <small className="contact-info">
                                    {contact.state}
                                </small>
                                <small className="contact-info">
                                    <i className="bi bi-telephone me-1"></i>
                                    +91 {contact.phone}
                                </small>
                            </div>
                        </Link>
                    ))}
                </div>
                <div
                    className={`list-container ${
                        filteredContacts.length > 0 ? "d-none" : "d-flex"
                    } justify-content-center align-items-center`}
                >
                    <p className="text-body-secondary">No results</p>
                </div>
            </div>
        </div>
    );
};

export default ContactList;
