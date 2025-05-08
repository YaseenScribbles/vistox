import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const VisitFilter = ({
    show,
    handleClose,
    duration,
    setDuration,
    fetchVisits,
}) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="sm"
            centered
            className="w-75"
            style={{ left: "50%", transform: "translate(-50%)" }}
        >
            <Modal.Body>
                <Form.Group controlId="fromDate" className="mb-3">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        type="date"
                        value={duration.from_date}
                        onChange={(e) =>
                            setDuration((prev) => ({
                                ...prev,
                                from_date: e.target.value,
                            }))
                        }
                    />
                </Form.Group>
                <Form.Group controlId="toDate" className="mb-3">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        type="date"
                        value={duration.to_date}
                        onChange={(e) =>
                            setDuration((prev) => ({
                                ...prev,
                                to_date: e.target.value,
                            }))
                        }
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={fetchVisits}>
                    Load
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VisitFilter;
