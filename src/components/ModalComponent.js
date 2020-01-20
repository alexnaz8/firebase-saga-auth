import React from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
const ModalComponent = ({ title, showModal, closeModal, bodyContent }) => {
    if (!showModal) return null;
    const hasForm = React.isValidElement(bodyContent);
    return (
        <>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {hasForm ? (
                        bodyContent
                    ) : (
                        <>
                            <p>Employee ID: {bodyContent.empID}</p>
                            <p>Employee name: {bodyContent.empName}</p>
                            <p>
                                Employee is active:{" "}
                                {bodyContent.empActive ? "Yes" : "No"}
                            </p>
                            <p>
                                Employee's department:{" "}
                                {bodyContent.empDepartment}
                            </p>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

const mapStateToProps = ({ modal }) => ({
    title: modal.title,
    bodyContent: modal.content
});

export default connect(mapStateToProps)(ModalComponent);
