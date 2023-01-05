import React, { useState, useEffect, FormEventHandler } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CheckboxC from "../../reuseables/CheckboxC";
import TextareaC from "../../reuseables/TextareaC";
import TextInputC from "../../reuseables/TextInputC";
import PlineTools, { TypeAlert } from "../../services/PlineTools";

const SipTrunkForm = () => {
    const params = useParams();
    const load = () => {
        PlineTools.getRequest("/sip-profiles/get-all")
            .then((result) => {
                console.log(result);
                setOptions(result.data);
            })
            .catch((error) => {
                PlineTools.errorDialogMessage("Failed To Get Profiles");
            })
            .finally(() => {
                let id = params.id;
                if (id !== undefined) {
                    const url = "/sip-trunks/" + id;
                    PlineTools.getRequest(url)
                        .then((result) => {
                            setState(result.data);
                        })
                        .catch(() => {
                            PlineTools.errorDialogMessage("Getting Data failed");
                        });
                }
            });
    };
    const [state, setState] = useState({
        id: null,
        name: "",
        acl: "",
        sipProfile: { id: 0 },
        username: "",
        password: "",
        fromUser: "",
        fromDomain: "",
        callerIdName: "",
        callerIdNumber: "",
        maxCalls: 0,
        proxy: "",
        enable: false,
        registerMode: "NoRegister",
        description: ""

    });
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const saveData = (e: any) => {
        e.preventDefault();

        let url = "/sip-trunks";
        if (state.id == null) {
            url += "/create";
        } else {
            url += "/update";
        }

        PlineTools.postRequest(url, state)
            .then((result) => {
                if (result.data.hasError) {
                    PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
                } else {
                    navigate("/sip-trunks/index");
                }
            })
            .catch((error) => {
                PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
                console.log(state);
            });
    };
    PlineTools.appAlert
    const getData = () => {
        const id = params.id;
        if (id != undefined) {
            PlineTools.getRequest("/sip-trunks/get/" + id)
                .then((result) => {
                    setState(result.data);
                })
                .catch(() => {
                    PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
                });
        }
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setState((state) => ({
            ...state,
            [name]: value,
        }));
    };
    const handleChecked = (e: any) => {
        const value = e.target.checked;
        const name = e.target.name;
        setState((state) => ({
            ...state,
            [name]: value,
        }));

    };
    useEffect(() => {
        getData();
        load();
    }, []);

    return (

        <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <h5>SIP Trunks</h5>
                <hr />

                <Form onSubmit={saveData}>
                    <Row>
                        <CheckboxC name="enable" label="Enable" checked={state.enable} onChange={handleChecked} />
                    </Row>

                    <Row>
                        <TextInputC
                            name="name"
                            label="Name"
                            require={true}
                            value={state.name}
                            onChange={handleChange}
                        />
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="maxCalls">
                                <Form.Label>Max Calls</Form.Label>
                                <Form.Control
                                    type="number"
                                    required
                                    onChange={(e) => {
                                        setState({ ...state, maxCalls: parseInt(e.target.value) });
                                    }}
                                    value={state.maxCalls}
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <TextInputC
                            name="username"
                            label="Username"
                            require={true}
                            value={state.username}
                            onChange={handleChange}
                        />

                        <TextInputC
                            name="password"
                            type="password"
                            label="Password"
                            require={true}
                            value={state.password}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <TextInputC
                            name="fromUser"
                            label="From User"
                            require={true}
                            value={state.fromUser}
                            onChange={handleChange}
                        />
                        <TextInputC
                            name="fromDomain"
                            label="From Domain"
                            require={true}
                            value={state.fromDomain}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <TextInputC
                            name="callerIdName"
                            label="Calller ID Name"
                            require={true}
                            value={state.callerIdName}
                            onChange={handleChange}
                        />
                        <TextInputC
                            name="callerIdNumber"
                            label="Caller ID Number"
                            require={true}
                            value={state.callerIdNumber}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="sipProfile">
                                <Form.Label>SIP Profile</Form.Label>
                                <select
                                    className={"form-select"}
                                    onChange={(e) => {
                                        let test = parseInt(e.target.value);
                                        setState(state => (state.sipProfile.id = test, state))
                                    }}>
                                    <option value={0}>Select Profile ...</option>
                                    {options.map((opt: any) => (
                                        <option key={opt.id} value={opt.id}>
                                            {opt.name}
                                        </option>
                                    ))}
                                </select>
                            </Form.Group>
                        </Col>
                        <TextInputC
                            name="proxy"
                            label="Proxy"
                            require={true}
                            value={state.proxy}
                            onChange={handleChange}
                        />

                    </Row>
                    <Row>
                        <TextInputC
                            name="acl"
                            label="Acl"
                            require={true}
                            value={state.acl}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row>
                        <TextareaC
                            name="description"
                            label="Description"
                            defaultValue={state.description}
                            onChange={handleChange}
                        />
                    </Row>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    {" "}
                    <Button
                        onClick={() => {
                            navigate("/sip-trunks/index");
                        }}
                        variant="danger"
                        type="button"
                    >
                        Cancel
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default SipTrunkForm;
