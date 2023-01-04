import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const GlobalOutboundsForm = () => {
  return (
    <Row>
        <Col md={{ span: 8, offset: 2 }}>
        <h5>Global Outbound Route</h5>
        <hr />
        <Form>
            <Row>
              <Col md={6}>
               <Form.Group>
                <Form.Label>Global Outbound Routes</Form.Label>
               <Form.Control
               required
               type='text'
               />
               </Form.Group>
              </Col>
              <Col md={6}>
               <Form.Group>
                <Form.Label>Name</Form.Label>
               <Form.Control
               required
               type='text'
               />
               </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col md={6}>
               <Form.Group>
                <Form.Label>sequential</Form.Label>
               <Form.Control
               required
               type='text'
               
               />
               </Form.Group>
              </Col>
              <Col md={6}>
               <Form.Group>
                <Form.Label>Global Outbound Routes</Form.Label>
               <Form.Control
               required
               type='text'
               />
               </Form.Group>
              </Col>
            </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default GlobalOutboundsForm