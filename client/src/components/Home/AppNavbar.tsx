import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import "./style.css";
import * as actions from "../../actions/users";
import { useDispatch } from "react-redux";
import SearchBar from "../Todo/SearchBar";
import {isAuth} from "../../utils/authUtils"

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const NavItems = (
    <React.Fragment>
      {isAuth(localStorage) ? (
        <React.Fragment>
          <Nav className="m-auto" navbar>
            <NavItem>
              <SearchBar></SearchBar>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavLink onClick={(e) => dispatch(actions.logout())}>
              Logout
            </NavLink>
          </Nav>
        </React.Fragment>
      ) : (
        <Nav className="ml-auto" navbar>
          <React.Fragment>
            <NavItem>
              <NavLink href="/login/">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register/">Register</NavLink>
            </NavItem>
          </React.Fragment>
        </Nav>
      )}
    </React.Fragment>
  );

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar" color="light" light expand="md">
        <NavbarBrand href="/">Todo app</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {NavItems}
        </Collapse>
      </Navbar>
    </div>
  );
}
