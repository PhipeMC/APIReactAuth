import React, { Component } from 'react';
import { Container, Navbar, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import image from '../Images/northwindLogoUnico.png';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import authService from './api-authorization/AuthorizeService';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true, isUserValid: false, isUserConnected: false,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidMount() {
    authService.getUser().then(
      (u) => {
        console.log(u);
        const valo = authService.isValidUser(u);
        console.log(valo);
        this.setState({ isUserValid: valo });
        console.log(valo);
      }
    );
  }

  render() {
    return (
      <header>
        {/*<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/" className='d-flex align-items-center me-auto fw-bold text-white'><img src={image} width='25rem' height='25em' className='me-1'/>Northwind</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow justify-content-center">
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/fetch-data">Fetch data</NavLink>
                </NavItem>
                <LoginMenu>
                </LoginMenu>
              </ul>
            </Collapse>
          </Container>
    </Navbar>*/}
        <Navbar dark expand="md" full="true" className='bg-faded d-flex justify-content-center px-3'>
          <Container fluid>
            <a href='/' className='navbar-brand d-flex align-items-center w-50 me-auto fw-bold'>
              <img src={image} width='25rem' height='25em' className='me-1' /> Northwind</a>
            <div className='navbar-collapse collapse w-100' id='collapsingNavbar3'>
              <ul className='navbar-nav w-100 justify-content-center'>
                {
                  this.state.isUserValid && <NavItem>
                    <NavLink tag={Link} className="" to="/suppliers">Inventario</NavLink>
                  </NavItem>
                }
              </ul>
              <ul className='nav navbar-nav ms-auto w-100 justify-content-end'>
                <LoginMenu>
                </LoginMenu>
              </ul>
            </div>
          </Container>
        </Navbar>
      </header>
    );
  }
}
