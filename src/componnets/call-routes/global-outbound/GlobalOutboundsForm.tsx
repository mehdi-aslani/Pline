import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import TextInputC from '../../reuseables/TextInputCustom';
import CheckboxCustom from '../../reuseables/CheckboxCustom';
import PlineTools from '../../services/PlineTools';

const GlobalOutboundsForm = () => {
  const [state, setState] = useState({
    id: null,
    name: '',
    privateRoute: false,
    sequential: 0,
    enable: false,
    description: ''
  });
  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h5>Global Outbound Route</h5>
        <hr />
        <Form>
          <Row>
            <CheckboxCustom name="enable" label="Enable" checked={state.enable} setState={setState} />
            <Row>
              <CheckboxCustom name="privateRoute" label="Private Route" checked={state.privateRoute} setState={setState} />
            </Row>
          </Row>
          <Row>
            <TextInputC
              name="name"
              label="Name"
              value={state.name}
              required={true}
              type="text"
              setState={setState}
            />
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default GlobalOutboundsForm