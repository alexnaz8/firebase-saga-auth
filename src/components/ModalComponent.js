import React from "react";
import Modal from "react-bootstrap/Modal";
export const ModalComponent = ({
    title = "User info",
    showModal,
    closeModal,
    bodyContent
}) => {
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
