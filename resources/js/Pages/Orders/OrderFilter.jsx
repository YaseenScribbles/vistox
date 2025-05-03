import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const OrderFilter = ({
    show,
    handleClose,
    duration,
    setDuration,
    fetchOrders,
}) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="sm"
            centered
            backdrop="static"
            className="w-75"
            style={{ left: "50%", transform: "translate(-50%)" }}
        >
            <Modal.Body>
                <Form.Group controlId="fromDate" className="mb-3">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        type="date"
                        value={duration.fromDate}
                        onChange={(e) =>
                            setDuration((prev) => ({
                                ...prev,
                                fromDate: e.target.value,
                            }))
                        }
                    />
                </Form.Group>
                <Form.Group controlId="toDate" className="mb-3">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        type="date"
                        value={duration.toDate}
                        onChange={(e) =>
                            setDuration((prev) => ({
                                ...prev,
                                toDate: e.target.value,
                            }))
                        }
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={fetchOrders}>
                    Load
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderFilter;
