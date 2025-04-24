import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({ show, onClose, message }) => {
    return (
        <Modal show={show} onHide={onClose} centered className="w-75" style={{ left: "50%", transform: "translate(-50%)" }} backdrop="static">
            <Modal.Body className="text-center">
                <i className="bi bi-check-circle-fill text-success display-1"></i>
                {message && <p className="mt-3 h6">{message}</p>}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button className="rounded-" size="lg" variant="success" onClick={onClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;
