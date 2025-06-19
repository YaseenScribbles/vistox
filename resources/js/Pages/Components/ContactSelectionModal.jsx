import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { v6 as uuid } from "uuid";

const ContactSelectionModal = ({ show, onClose, contacts, setContact }) => {
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [filterText, setFilterText] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (filterText) {
            const filteredContacts = contacts.filter((contact) =>
                contact.shop_name
                    .toLowerCase()
                    .includes(filterText.toLowerCase())
            );
            setFilteredContacts(filteredContacts);
        }
    };

    useEffect(() => {
        if (!filterText & (contacts.length > 0)) {
            setFilteredContacts(contacts);
        }
    }, [filterText]);

    return (
        <Modal show={show} fullscreen onHide={onClose}>
            <Modal.Body className="p-0" style={{ background: "#f8f9fa" }}>
                {/* <!-- Navbar --> */}
                <nav className="navbar navbar-ios sticky-top px-2" style={{ backgroundColor: "#e3f2fd", height: "60px" }}>
                    <div className="container-fluid d-flex justify-content-between align-items-center position-relative">
                        <a
                            href="#"
                            className="btn btn-link text-decoration-none p-0"
                            onClick={onClose}
                        >
                            <i className="bi bi-chevron-left fs-5"></i>
                        </a>
                        <span className="navbar-title mx-auto">
                            Select Contact
                        </span>
                        <span
                            className="p-0"
                            style={{ width: "1.5rem" }}
                        ></span>
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
                        <button
                            type="submit"
                            className="btn btn-outline-primary"
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>

                {/* <!-- Contact List --> */}
                <div className="container py-3">
                    <div className="list-group">
                        {/* <!-- Contact Item --> */}
                        {filteredContacts.map((contact) => (
                            <a
                                href="#"
                                className="list-group-item list-group-item-action"
                                key={uuid()}
                                onClick={() => {
                                    setContact(contact);
                                    onClose();
                                }}
                            >
                                <div className="fw-semibold">
                                    {contact.shop_name}
                                </div>
                                <div className="contact-meta">
                                    {contact.contact_person}
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-1">
                                    <small className="contact-info">
                                        {contact.state}
                                    </small>
                                    <small className="contact-info">
                                        <i className="bi bi-telephone me-1"></i>{" "}
                                        +91 {contact.phone}
                                    </small>
                                </div>
                            </a>
                        ))}

                        <div
                            className={`list-container ${
                                filteredContacts.length > 0
                                    ? "d-none"
                                    : "d-flex"
                            } justify-content-center align-items-center`}
                        >
                            <p className="text-body-secondary">No results</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ContactSelectionModal;
