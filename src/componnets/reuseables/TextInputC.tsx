import React from 'react'
import { Col } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

const TextInputC = (props: any) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (props.type === "number") {
      props.setState((state: any) => ({
        ...state,
        [name]: parseInt(value),
      }));
    } else {
      props.setState((state: any) => ({
        ...state,
        [name]: value,
      }));
    };
  }
  return (
    <Col md={props.md}>
      <Form.Group
        hidden={props.disabled}
        className="mb-3"
        controlId={props.name}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          name={props.name}
          hidden={props.disabled}
          disabled={props.disabled}
          type={props.type}
          required={props.require}
          value={props.value}
          onChange={handleChange}
        />
      </Form.Group>
    </Col>

  )
}
TextInputC.defaultProps = {
  requir: false,
  disabled: false,
  type: "text",
  md: 6
}
export default TextInputC