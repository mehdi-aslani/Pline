import React from 'react'
import { Col } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

const TextInputC = (props: any) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    props.setState((state: any) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <Col md={props.md}>
      <Form.Group
        className="mb-3"
        controlId={props.name}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          name={props.name}
          disabled={props.disabled}
          type={props.type}
          required={props.require}
          defaultValue={props.value}
          onChange={handleChange}
        />
      </Form.Group>
    </Col>

  )
}
TextInputC.defaultProps = {
  requir: false,
  disabled:false,
  type: "text",
  md: 6
}
export default TextInputC