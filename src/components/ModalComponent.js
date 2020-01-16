import React from 'react';
import Modal from "react-bootstrap/Modal";
export const ModalComponent = ({user, showModal, toggleModal}) => {
    console.log(showModal, toggleModal)
    return (
        <>
            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>User details</Modal.Title>
                </Modal.Header>
                <Modal.Body>There will be user's info!</Modal.Body>
            </Modal>
        </>
    );
}