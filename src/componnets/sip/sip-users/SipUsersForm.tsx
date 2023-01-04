import React, { useState, useEffect, FormEventHandler } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CInput from "../../form/CInput";
import PlineTools, { TypeAlert } from "../../services/PlineTools";

const SipUsersForm = () => {

  const params = useParams();
  const [state, setState] = useState({
    id: null,
    uid: "",
    parallel: "",
    acl: "",
    password: "",
    effectiveCallerIdNumber: "",
    effectiveCallerIdName: "",
    outboundCallerIdNumber: "",
    outboundCallerIdName: "",
    sipProfile: "",
    sipUserGroup: "",
    enable: true
  });
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    profileOptions: [],
    sipGroupOptions: []
  });
  const saveData = (e: any) => {
    e.preventDefault();

    let url = "/sip-users";
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
          navigate("/sip-users/index");
        }
      })
      .catch((error) => {
        PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
      });
  };

  const getData = () => {
    const id = params.id;
    if (id != undefined) {
      PlineTools.getRequest("/sip-users/get/" + id)
        .then((result) => {
          setState(result.data);
        })
        .catch(() => {
          PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
        });
    }
  };
  const load = () => {
    PlineTools.getRequest("/sip-users/get-sip-user-options")
      .then((result) => {
        console.log(result.data);
        setOptions(result.data);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          error.response.data.forEach((value: any) => {
            PlineTools.errorDialogMessage(value.message);
          });
        }
      })
      .finally(() => {
        let id = params.id;
        if (id !== undefined) {
          const url = "/sip-users/" + id;
          PlineTools.getRequest(url)
            .then((result: any) => {
              setState(result.data);
            })
            .catch(() => {
              PlineTools.errorDialogMessage("Getting Data failed");
            });
        }
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (

    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h5>SIP User</h5>
        <hr />
        <Form onSubmit={saveData}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="enable">
                <Form.Check
                  type="checkbox"
                  label="Enable"
                  onChange={(e) => {
                    setState({ ...state, enable: e.target.checked });
                  }}
                  checked={state.enable}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Uid</Form.Label>
                <Form.Control
                  type="text"
                  name="uid"
                  defaultValue={state.uid}
                  onChange={(e) => {
                    setState({ ...state, uid: e.target.value });
                  }}
                  value={state.uid}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Parallel</Form.Label>
                <Form.Control
                  type="text"
                  name="parallel"
                  defaultValue={state.uid}
                  onChange={(e) => {
                    setState({ ...state, parallel: e.target.value });
                  }}
                  value={state.parallel}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  defaultValue={state.uid}
                  onChange={(e) => {
                    setState({ ...state, password: e.target.value });
                  }}
                  value={state.password}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Acl</Form.Label>
                <Form.Control
                  type="text"
                  name="uid"
                  defaultValue={state.acl}
                  onChange={(e) => {
                    setState({ ...state, acl: e.target.value });
                  }}
                  value={state.acl}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Effective CallerId Name</Form.Label>
                <Form.Control
                  type="text"
                  name="uid"
                  defaultValue={state.effectiveCallerIdName}
                  onChange={(e) => {
                    setState({ ...state, effectiveCallerIdName: e.target.value });
                  }}
                  value={state.effectiveCallerIdName}
                />
              </Form.Group>
            </Col>
            <Col md={6}>   <Form.Group className="mb-3">
              <Form.Label>Effective CallerId Number</Form.Label>
              <Form.Control
                type="text"
                name="uid"
                defaultValue={state.effectiveCallerIdNumber}
                onChange={(e) => {
                  setState({ ...state, effectiveCallerIdNumber: e.target.value });
                }}
                value={state.effectiveCallerIdNumber}
              />
            </Form.Group></Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Outbound CallerId Name</Form.Label>
                <Form.Control
                  type="text"
                  name="uid"
                  defaultValue={state.outboundCallerIdName}
                  onChange={(e) => {
                    setState({ ...state, outboundCallerIdName: e.target.value });
                  }}
                  value={state.outboundCallerIdName}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Outbound CallerId Number</Form.Label>
                <Form.Control
                  type="text"
                  name="uid"
                  defaultValue={state.outboundCallerIdNumber}
                  onChange={(e) => {
                    setState({ ...state, outboundCallerIdNumber: e.target.value });
                  }}
                  value={state.outboundCallerIdNumber}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="sipProfiles">
                <Form.Label>SIP Profiles</Form.Label>

                <select
                  className={"form-select"}
                  value={state.sipProfile}

                  onChange={(e) => {
                    let tmp = { ...state };
                    tmp.sipProfile = e.target.value;
                    setState(tmp);
                  }}>
                  <option value={0}>Select Profile ...</option>
                  {options.profileOptions.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="sipProfiles">
                <Form.Label>SIP User Groups</Form.Label>

                <select
                  className={"form-select"}
                  value={state.sipUserGroup}
                  onChange={(e) => {
                    let tmp = { ...state };
                    tmp.sipUserGroup = e.target.value;
                    setState(tmp);
                  }}>
                  <option value={0}>Select User Group ...</option>
                  {options.sipGroupOptions.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
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
        </Form>
      </Col>


    </Row>


  );
};

export default SipUsersForm;
