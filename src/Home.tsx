import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";


export function Home() {


  return (
    <>
      <Container className=" my-2 d-flex flex-column justify-content-between text-center">
        <Link className="btn btn-primary mb-3 mt-3 text-white" to="/register-meal">Register Meal</Link>
        <Link className="btn btn-primary text-white" to="/register-symptoms">Register Symptoms</Link>
      </Container>
    </>
  )
}
