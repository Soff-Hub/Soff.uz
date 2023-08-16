import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';


function Example(props) {
  const { className } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

 

  return (
    <div>
      <Form inline onSubmit={(e) => e.preventDefault()}>
        <Button color="danger" onClick={toggle}>
          Click Me
        </Button>
      </Form>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        Delete Modal
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Example;