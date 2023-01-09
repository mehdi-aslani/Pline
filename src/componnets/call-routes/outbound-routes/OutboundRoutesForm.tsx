import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckboxC from '../../reuseables/CheckboxC';
import TextareaC from '../../reuseables/TextareaC';
import TextInputC from '../../reuseables/TextInputC';

const OutboundRoutesForm = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: null,
        enable: false,
        name: "",
        privateRoute: false,
        sequential: 0,
        description: ""

    });
    return (
        <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <h5>SIP Trunks</h5>
                <hr />
                <Form >
                    <Row>
                        <CheckboxC
                            name="enable"
                            label="Enable"
                            checked={state.enable}
                            setState={setState}
                        />
                        <CheckboxC
                            name="privateRoute"
                            label="Private Route"
                            checked={state.privateRoute}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <TextInputC
                            name="name"
                            label="Name"
                            value={state.name}
                            setState={setState}
                            require={true}
                        />
                        <TextInputC
                            name="sequential"
                            label="Sequential"
                            type="number"
                            min={0}
                            value={state.sequential}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <TextareaC
                            name="description"
                            label="Description"
                            value={state.description}
                            setState={setState}
                            md={12}
                        />
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>{" "}
                            <Button
                                variant="danger"
                                onClick={() => {
                                    navigate("/call-routes/outbound-routes/index");
                                }}
                            >
                                Cancel
                            </Button>{" "}
                        </Col>
                    </Row>
                </Form>
            </Col>

        </Row>
    )
}

export default OutboundRoutesForm