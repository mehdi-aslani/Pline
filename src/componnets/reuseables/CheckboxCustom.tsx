import React from 'react'
import { Col, Form } from 'react-bootstrap';

const CheckboxCustom = (props: any) => {

  const handleChecked = (e: any) => {
    const value = e.target.checked;
    const name = e.target.name;
    props.setState((state: any) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <Col md={props.md}>
      <Form.Group className="mb-3" controlId={props.name}>
        <Form.Check
          type="checkbox"
          label={props.label}
          name={props.name}
          onChange={handleChecked}
          checked={props.checked}
        />
      </Form.Group>
    </Col>
  )
}
CheckboxCustom.defaultProps = {
  md: 6
}
export default CheckboxCustom