import React from 'react'
import { Col } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

const TextInputC = (props: any) => {
  return (
    <Col md={6}>
      <Form.Group
        className="mb-3"
         controlId={props.name}
        >
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          name={props.name}
          type={props.type}
          required={props.require}
          defaultValue={props.value}
          onChange={props.onChange}
        />
      </Form.Group>
    </Col>

  )
}
TextInputC.defaultProps = {
  requir: false,
  type: "text"
}
export default TextInputC