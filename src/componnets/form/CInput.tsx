import React from 'react'
import { Col, Form } from 'react-bootstrap';

const CInput = (props:any) => {
  return (
    <Col md={6}>
      <Form.Group className="mb-3">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type={props.inputType}
          name={props.inputName}
          defaultValue={props.defValue}
          onChange={props.change}
        />
      </Form.Group>
    </Col>
  )
}

export default CInput