import React, { useState, useEffect, FormEventHandler } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PlineTools, { TypeAlert } from "../../services/PlineTools";
import TextareaC from "../../reuseables/TextareaC";
import TextInputC from "../../reuseables/TextInputC";
import CheckboxC from "../../reuseables/CheckboxC";


const SipProfileForm = () => {
  const params = useParams();
  const [state, setState] = useState({
    id: null,
    name: "",
    enable:true,
    description: "",
  });
  const navigate = useNavigate();

  const saveData = (e: any) => {
    e.preventDefault();
    let url = "/sip-profiles";
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
          navigate("/sip-profiles/index");
        }
      })
      .catch((error) => {
        PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
      });
  };

  const getData = () => {
    const id = params.id;
    if (id != undefined) {
      PlineTools.getRequest("/sip-profiles/get/" + id)
        .then((result:any) => {
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
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h5>SIP Profiles</h5>
          <hr />
          <Form onSubmit={saveData}>
            <Row>
              <CheckboxC 
                label="Enable"
                name="enable"
                checked={state.enable}
                setState={setState}
              />
            </Row>
            <Row>
              <TextInputC
                name="name"
                label="Name" require={true} value={state.name} setState={setState} />
            </Row>
            <Row>
              <TextareaC name="description" label="Description" value={state.description} setState={setState} />
            </Row>
            <Button variant="primary" type="submit">
              Save
            </Button>{" "}
            <Button
              onClick={() => {
                navigate("/sip-profiles/index");
              }}
              variant="danger"
              type="button"
            >
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SipProfileForm;
