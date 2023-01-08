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
        if (state.registerMode === "Register") {
            setRequire({ ...isrequire, password: true, username: true, proxy: { req: false, disabled: true }, });
        }
        else {
            setRequire({ ...isrequire, password: true, username: true, proxy: { req: false, disabled: true }, });
        }
        PlineTools.getRequest("/sip-profiles/get-all")
            .then((result) => {
                setOptions(result.data);
            })
            .catch((error) => {
                PlineTools.errorDialogMessage("Failed To Get Profiles");
            })
            .finally(() => {
                let id = params.id;
                if (id !== undefined) {
                    const url = "/sip-trunks/get/" + id;
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
    const [isrequire, setRequire] = useState({
        proxy: {
            req: false,
            disabled: false
        },
        username: false,
        password: false,

    });
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
        registerMode: '',
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
                    console.log(state);
                    navigate("/sip-trunks/index");
                }
            })
            .catch((error) => {
                PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
                console.log(state);
            });
    };
    useEffect(() => {
        load();
    }, []);
    return (
        <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <h5>SIP Trunks</h5>
                <hr />
                <Form onSubmit={saveData}>
                    <Row>
                        <CheckboxC name="enable" label="Enable" checked={state.enable} setState={setState} />
                    </Row>

                    <Row>
                        <TextInputC
                            name="name"
                            label="Name"
                            require={true}
                            value={state.name}
                            setState={setState}
                        />
                        <TextInputC
                            type="number"
                            name="maxCalls"
                            label="Max Call"
                            value={state.maxCalls}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <TextInputC
                            name="username"
                            label="Username"
                            require={isrequire.username}
                            value={state.username}
                            setState={setState}
                        />

                        <TextInputC
                            name="password"
                            type="password"
                            label="Password"
                            require={isrequire.password}
                            value={state.password}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <TextInputC
                            name="fromUser"
                            label="From User"
                            require={true}
                            value={state.fromUser}
                            setState={setState}
                        />
                        <TextInputC
                            name="fromDomain"
                            label="From Domain"
                            require={true}
                            value={state.fromDomain}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <TextInputC
                            name="callerIdName"
                            label="Calller ID Name"
                            require={true}
                            value={state.callerIdName}
                            setState={setState}
                        />
                        <TextInputC
                            name="callerIdNumber"
                            label="Caller ID Number"
                            require={true}
                            value={state.callerIdNumber}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="sipProfile">
                                <Form.Label>SIP Profile</Form.Label>
                                <select
                                    className={"form-select"}
                                    value={state.sipProfile.id}
                                    onChange={(e) => {
                                        setState({ ...state, sipProfile: { id: parseInt(e.target.value) } });
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

                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="registerMode">
                                <Form.Label>Register Mode</Form.Label>
                                <select
                                    value={state.registerMode}
                                    className={"form-select"}
                                    onChange={(e) => {
                                        let tmp = e.target.value;
                                        setState({ ...state, registerMode: tmp });
                                        if (tmp === "NoRegister" || tmp === "") {
                                            setRequire({ ...isrequire, password: false, username: false, proxy: { req: true, disabled: false } });
                                        } else {
                                            setRequire({ ...isrequire, password: true, username: true, proxy: { req: false, disabled: true } });
                                        }
                                    }}
                                >
                                    <option value={""}>Select Register Type</option>
                                    <option value={"NoRegister"}>NoRegister</option>
                                    <option value={"Registrable"}>Registrable</option>
                                    <option value={"Register"}>Register</option>
                                </select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>

                        <TextInputC
                            name="proxy"
                            label="Proxy"
                            disabled={isrequire.proxy.disabled}
                            require={isrequire.proxy.req}
                            value={state.proxy}
                            setState={setState}
                        />
                    </Row>
                    <Row>
                        <TextareaC
                            name="acl"
                            label="Acl"
                            require={true}
                            value={state.acl}
                            setState={setState}
                        />
                        <TextareaC
                            name="description"
                            label="Description"
                            value={state.description}
                            setState={setState}
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
