import React from 'react'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import Logo from '../assets/icons/SpotPer.png'

const TheHeader = () => {

  return (
    <Navbar className="header">
      <Navbar.Brand href="#home">
        <img
          alt="Spotper Logo"
          src={Logo}
          className="logo d-inline-block align-top" 
        /> 
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#albums" className="nav-link">Albums</Nav.Link>
        <Nav.Link href="#playlists" className="nav-link">Playlists</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="search-field mr-sm-2" />
        <Button variant="outline-info" className="search-button">Search</Button>
    </Form>
  </Navbar>
    
  )
}

export default TheHeader
