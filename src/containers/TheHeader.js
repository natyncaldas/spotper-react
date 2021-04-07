import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
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
        <Nav.Link href="#dashboard" className="nav-link">Albums</Nav.Link>
        <Nav.Link href="#dashboard" className="nav-link">Playlists</Nav.Link>
      </Nav>
   
  </Navbar>
    
  )
}

export default TheHeader
