import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import "./style.css"
import * as actions from "../../actions/users"
import { useDispatch } from 'react-redux';



export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.token;
  const dispatch = useDispatch();

  const NavItems = (
    <React.Fragment>
    {(token === null || token === "" ) ? 
        <React.Fragment>
          <NavItem>
            <NavLink href="/login/">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/register/">Register</NavLink>
          </NavItem>
        </React.Fragment>
      :
        <NavItem>
          <NavLink href="/" onClick={e => dispatch(actions.logout())}>Logout</NavLink>
        </NavItem>
    }
   </React.Fragment>)

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar" color="light" light expand="md">
        <NavbarBrand href="/">Todo app</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {NavItems}
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}