import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { v6 as uuid } from "uuid";

const ContactSelectionModal = ({ show, onClose, contacts, setContact }) => {
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        if (filterText) {
            const filteredContacts = contacts.filter((contact) =>
                contact.contact_person
                    .toLowerCase()
                    .includes(filterText.toLowerCase())
            );
            setFilteredContacts(filteredContacts);
        }
        if (!filterText & (contacts.length > 0)) {
            setFilteredContacts(contacts);
        }
    }, [filterText]);

    return (
        <Modal show={show} fullscreen onHide={onClose}>
            <Modal.Header closeButton>Select Contact</Modal.Header>
            <Modal.Body className="p-3" style={{ background: "#f8f9fa" }}>
                <input
                    type="text"
                    className="form-control mb-3"
                    id="contactSearch"
                    placeholder="Search contact..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />

                <ul className="list-group" id="contactList">
                    {filteredContacts.map((contact) => (
                        <li
                            key={uuid()}
                            className="list-group-item list-group-item-action"
                            onClick={() => {
                                setContact(contact);
                                onClose();
                            }}
                        >
                            {contact.contact_person}
                        </li>
                    ))}
                </ul>
            </Modal.Body>
        </Modal>
    );
};

export default ContactSelectionModal;
