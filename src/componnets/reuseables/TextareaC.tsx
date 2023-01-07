import React from 'react'
import { Col, Form } from 'react-bootstrap'

const TextareaC = (props: any) => {
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        props.setState((state: any) => ({
          ...state,
          [name]: value,
        }));
      };
    return (
        <Col md={props.md}>
            <Form.Group className="mb-3">
                <Form.Label>{props.label}</Form.Label>
                <Form.Control
                    name={props.name}
                    as={"textarea"}
                    rows={props.rows}
                    maxLength={props.lenght}
                    defaultValue={props.value}
                    onChange={handleChange}
                />
            </Form.Group>
        </Col>
    )
}
TextareaC.defaultProps = {
    rows: 3,
    length: 1024,
    md: 6
}
export default TextareaC