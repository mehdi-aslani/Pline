import React from 'react'
import { Col, Form } from 'react-bootstrap';

const CheckboxC = (props: any) => {
  return (
    <Col md={6}>
      <Form.Group className="mb-3" controlId={props.name}>
        <Form.Check
          label={props.label}
          onChange={props.onChange}
          checked={props.value}
        />
      </Form.Group>
    </Col>
  )
}

export default CheckboxC