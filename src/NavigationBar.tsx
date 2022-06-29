import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { CalendarCheckFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom"

export const NavigationBar = () => {

  return (
    <Navbar className="navbarback" variant="dark" >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Food Diary

        </Navbar.Brand>

        <Nav>
          <Nav.Item>
            <Nav.Link className="text-dark" to="/Calendar" as={Link} ><CalendarCheckFill style={{ color: '#E684AE', fontSize: '20px' }} /></Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar >

  )
}