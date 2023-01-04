import React, { useState, useEffect, FormEventHandler } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CInput from "../../form/CInput";
import PlineTools, { TypeAlert } from "../../services/PlineTools";

const SipUserGroupsForm = () => {
  const params = useParams();
  const [state, setState] = useState({
    id: null,
    name: "",
    description: "",
  });
  const navigate = useNavigate();
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
          
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            name="name"
            type="text"
            defaultValue={state.name}
            onChange={(e)=>{
              let tmp ={...state};
              tmp.name=e.target.value;
              setState(tmp)
            }}
          />
        </Form.Group>
        </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="family"
                as={"textarea"}
                rows={3}
                maxLength={1024}
                defaultValue={state.description}
                onChange={(e) => {
                  let tmp = { ...state };
                  tmp.description = e.target.value;
                  setState(tmp);
                }}
              />
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

export default SipUserGroupsForm;
