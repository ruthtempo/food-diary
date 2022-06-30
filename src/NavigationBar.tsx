import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { CalendarCheckFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import bowl from "./bowl.png"

export const NavigationBar = () => {

  return (
    <Navbar className="navbarback" >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src={bowl}
            width="50"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>

        <Nav>
          <Nav.Item>
            <Nav.Link className="text-dark" to="/calendar" as={Link} ><CalendarCheckFill className="icon p-0" style={{ fontSize: 30 }} /></Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar >

  )
}