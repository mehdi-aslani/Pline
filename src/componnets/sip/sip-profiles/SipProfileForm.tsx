import React, { useState, useEffect, FormEventHandler } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PlineTools, { TypeAlert } from "../../services/PlineTools";
import TextareaC from "../../reuseables/TextareaC";
import TextInputC from "../../reuseables/TextInputC";


const SipProfileForm = () => {
  const params = useParams();
  const [state, setState] = useState({
    id: null,
    name: "",
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h5>SIP Profiles</h5>
          <hr />
          <Form onSubmit={saveData}>
            <Row>
              <TextInputC
                name="name"
                label="Name" require={true} defaultValue={state.name} onChange={handleChange} />
            </Row>
            <Row>
              <TextareaC name="description" label="Description" defaultValue={state.description} onChange={handleChange} />
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