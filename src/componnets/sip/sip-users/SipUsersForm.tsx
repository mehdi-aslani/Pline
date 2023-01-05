import React, { useState, useEffect, FormEventHandler } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CheckboxC from "../../reuseables/CheckboxC";
import TextInputC from "../../reuseables/TextInputC";
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
  }, []);

  return (

    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h5>SIP User</h5>
        <hr />
        <Form onSubmit={saveData}>
          <Row>
            <CheckboxC
              type="checkbox"
              label="Enable"
              name="enable"
              checked={state.enable}
              onChange={handleChecked}
            />
          </Row>
          <Row>
            <TextInputC
              name="uid"
              label="Uid"
              type="text"
              require={true}
              value={state.uid}
              onChange={handleChange}
            />
            <TextInputC
              label="Parallel"
              name="parallel"
              type="text"
              require={true}
              value={state.parallel}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <TextInputC
              name="password"
              label="Password"
              type="text"
              require={true}
              value={state.password}
              onChange={handleChange}
            />
            <TextInputC
              name="acl"
              label="Acl"
              type="text"
              require={true}
              value={state.acl}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <TextInputC
              name="effectiveCallerIdName"
              label="Effective CallerId Name"
              type="text"
              require={true}
              value={state.effectiveCallerIdName}
              onChange={handleChange}
            />
            <TextInputC
              name="effectiveCallerIdNumber"
              label="Effective CallerId Number"
              type="text"
              require={true}
              value={state.effectiveCallerIdNumber}
              onChange={handleChange}
            />
          </Row>
          <Row>
          <TextInputC
              name="outboundCallerIdName"
              label="Outbound CallerId Name"
              type="text"
              require={true}
              value={state.outboundCallerIdName}
              onChange={handleChange}
            />
             <TextInputC
              name="outboundCallerIdNumber"
              label="Outbound CallerId Number"
              type="text"
              require={true}
              value={state.outboundCallerIdNumber}
              onChange={handleChange}
            />
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
