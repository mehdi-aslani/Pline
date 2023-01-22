import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import TextInputCustom from '../../reuseables/TextInputCustom'
import ToolTipCustom from '../../reuseables/tooltip/ToolTipCustom'
import PlineTools from '../../services/PlineTools'
import { useNavigate, useParams } from 'react-router'
import TextareaCustom from '../../reuseables/TextareaCustom'

const AddGroupUsersForm = () => {
    const params = useParams();
    const [state, setState] = useState({
        id: null,
        range: "",
        passwordType: "",
        sipGroup: {
            id: 0
        },
        description: ""
    });
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const load = () => {

        PlineTools.getRequest("/sip-users/get-profiles-group")
            .then((result) => {
                setOptions(result.data.sipGroups);
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
    useEffect(() => {
        load();
    }, [])

    return (
        <>
            <Row>
                <Form>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h5>Add Users As Group</h5>
                        <hr />
                        <TextInputCustom
                            required={true}
                            name="users-range"
                            label="Users Range"
                            placeholder="Example 1000-1020"
                            value={state.range}
                            onChange={setState}
                        />
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="registerMode">
                                <Form.Label>Register Mode</Form.Label>
                                <ToolTipCustom />
                                <select
                                    value={state.passwordType}
                                    onChange={(e) =>
                                        setState({ ...state, passwordType: e.target.value })
                                    }
                                    className={"form-select"}>
                                    <option value={"noPassword"}>NoPassword</option>
                                    <option value={"random"}>Random</option>
                                    <option value={"userName"}>UserName as Password</option>
                                </select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="registerMode">
                                <Form.Label>SipGroup</Form.Label>
                                <ToolTipCustom />
                                <select
                                    value={state.sipGroup.id}
                                    onChange={(e) => {
                                        setState({ ...state, sipGroup: { id: parseInt(e.target.value) } })
                                    }}
                                    className={"form-select"}>
                                    {options.map((opt: any) => (
                                        <option key={opt.id} value={opt.id}>
                                            {opt.name}
                                        </option>
                                    ))}
                                </select>
                            </Form.Group>
                        </Col>

                        <TextareaCustom
                            name="description"
                            label="Description"
                            value={state.description}
                            onChange={setState}
                        />

                        <Button
                            variant="primary" type="submit">
                            Save
                        </Button>{" "}
                        <Button
                            onClick={() => {
                                navigate("/sip-users/index");
                            }}
                            variant="danger"
                            type="button"
                        >
                            Cancel
                        </Button>

                    </Col>
                </Form>
            </Row>
        </>
    )
}

export default AddGroupUsersForm