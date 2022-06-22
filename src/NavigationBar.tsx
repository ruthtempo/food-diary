import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export const NavigationBar = () => {

  return (
    <Navbar style={{
      backgroundColor: "#c88484"
    }} variant="dark" >
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
            <Nav.Link className="text-primary" to="/Calendar" as={Link} >Calendar</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar >

  )
}