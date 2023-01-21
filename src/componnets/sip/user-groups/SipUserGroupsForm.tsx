import React, { useState, useEffect, FormEventHandler } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TextareaCustom from "../../reuseables/TextareaCustom";
import TextInputCustom from "../../reuseables/TextInputCustom";
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

    let url = "/sip-group-users";
    if (state.id == null) {
      PlineTools.postRequest(url, state)
        .then((result: any) => {
          if (result.data.hasError) {
            PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
          } else {
            navigate("/sip-group-users/index");
          }
        })
        .catch((error: any) => {
          PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
        });

    } else {
      PlineTools.patchRequest(url, state)
        .then((result: any) => {
          if (result.data.hasError) {
            PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
          } else {
            navigate("/sip-group-users/index");
          }
        })
        .catch((error: any) => {
          PlineTools.errorDialogMessage("An error occurred while executing your request. Contact the system administrator");
        });
    };
  }



  const getData = () => {
    const id = params.id;
    if (id != undefined) {
      PlineTools.getRequest("/sip-group-users/" + id)
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
        <h5>SIP User Group</h5>
        <hr />
        <Form onSubmit={saveData}>
          <Row>
            <TextInputCustom
              type="text"
              name="name"
              label="Name"
              value={state.name}
              setState={setState}
            />
          </Row>
          <Row>
            <TextareaCustom
              name="description"
              label="Description"
              value={state.description}
              setState={setState}
            />
          </Row>
          <Button variant="primary" type="submit">
            Save
          </Button>{" "}
          <Button
            onClick={() => {
              navigate("/sip-group-users/index");
            }}
            variant="danger"
            type="button">
            Cancel
          </Button>
        </Form>
      </Col>
    </Row>


  );
};

export default SipUserGroupsForm;
