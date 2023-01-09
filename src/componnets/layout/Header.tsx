import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import PlineTools, { TypeMessage } from "../services/PlineTools";
import "./Header.css";

interface IHeaderProps {
  LogoutAction: Function;
  fullname: string;
}

const Header = (props: IHeaderProps) => {
  const navDropdownTitle = (
    <>
      <PersonCircle /> {props.fullname}
    </>
  );

  const apply = () => {
    if (window.confirm("Are you sure you want to apply the changes?")) {
      PlineTools.postRequest("/configs/apply", {
        token: PlineTools.getCookies("token"),
      })
        .then((result) => {
          PlineTools.successDialogMessage("Apply configuration successful");
        })
        .catch((error) => {
          PlineTools.dialogMessage(
            "An error occurred while executing your request. Contact the system administrator\n" +
            error
            , "Error", TypeMessage.ERROR);
        });
    }
  };

  return (
    <header className="header">
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="#">
            Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title="SIP" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/settings/sip-globals">
                  Global SIP Settings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings/system-sip-settings">
                  System SIP Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/sip-profiles/index">
                  SIP Profiles
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/sip-trunks/index">
                  SIP Trunks
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/sip-suer-groups/index">
                  Sip User Groups
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sip-users/index">
                  Sip Users
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Call Routes">
              <NavDropdown.Item as={Link} to="/call-routes/outbound-routes/index">
                Outbound Routes
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/call-routes/specific-outbound/index">
                  Specific Outbound Routes
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/call-routes/inbound/index">
                  InBound Routes
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/user/change-password">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => {props.LogoutAction(); }}>
                Logout
                </NavDropdown.Item>

                {/* <NavDropdown.Divider /> */}
              </NavDropdown>
              <Nav.Link onClick={apply} className="apply">Apply</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
