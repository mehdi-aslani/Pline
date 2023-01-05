import React from 'react'
import { Col, Form } from 'react-bootstrap';

const CheckboxC = (props: any) => {
  return (
    <Col md={6}>
    <Form.Group className="mb-3" controlId={props.name}>
      <Form.Check
        type="checkbox"
        label={props.label}
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
      />
    </Form.Group>
  </Col>
  )
}

export default CheckboxC