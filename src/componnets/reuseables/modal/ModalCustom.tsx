import React from 'react';
import { Button, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
const ModalCustom = (props: any) => {
  return (
    <>
      <Modal fullscreen={true} show={props.show} onHide={props.onHide}  >
        <ModalHeader>
          <ModalTitle>
            {props.title}
          </ModalTitle>
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button variant='danger' onClick={props.onHide}>EXIT</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
ModalCustom.defaultProps = {
  title: "Add Route"
}
export default ModalCustom