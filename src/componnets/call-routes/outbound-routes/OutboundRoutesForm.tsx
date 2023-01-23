import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckboxCustom from '../../reuseables/CheckboxCustom';
import TextInputCustom from '../../reuseables/TextInputCustom';
import TextareaCustom from '../../reuseables/TextareaCustom';

const OutboundRoutesForm = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: null,
        enable: false,
        name: "",
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
                        <CheckboxCustom
                            name="enable"
                            label="Enable"
                            checked={state.enable}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <TextInputCustom
                            name="name"
                            label="Name"
                            value={state.name}
                            setState={setState}
                            require={true}
                        />

                        <TextInputCustom
                            name="sequential"
                            label="Sequential"
                            type="number"
                            min={0}
                            value={state.sequential}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <TextareaCustom
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