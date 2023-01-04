import React from 'react'
import { Col, Form } from 'react-bootstrap'

const TextareaC = (props:any) => {
    return (
        <Col md={6}>
            <Form.Group className="mb-3">
                <Form.Label>{props.label}</Form.Label>
                <Form.Control
                    name={props.name}
                    as={"textarea"}
                    rows={props.rows}
                    maxLength={props.lenght}
                    defaultValue={props.value}
                    onChange={props.onChange}
                />
            </Form.Group>
        </Col>
    )
}
TextareaC.defaultProps ={
  rows:3,
  length:1024
}
export default TextareaC