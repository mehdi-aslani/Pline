import React, { useState, useEffect, FormEventHandler } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PlineTools, { TypeAlert } from "../../services/PlineTools";

const InBoundsForm = () => {

  const params = useParams();
  const [state, setState] = useState({
    id: null,
    name:"",
    publicRoute:false,
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
            <Col md={6}>
              <Form.Group className="mb-3" controlId="publicRoute">
                <Form.Check
                  type="checkbox"
                  label="Public Route"
                  onChange={(e) => {
                    setState({ ...state, publicRoute: e.target.checked });
                  }}
                  checked={state.publicRoute}
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

export default InBoundsForm;
