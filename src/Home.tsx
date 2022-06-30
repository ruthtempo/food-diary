import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import foodMood from "./FOODMOOD.png"

export function Home() {


  return (
    <>
      <Container className=" my-2 d-flex flex-column justify-content-between text-center">
        <img src={foodMood} alt="foodmood logo"></img>
        <Link className="btn btn-light mb-3 mt-3" to="/register-meal">Register Meal</Link>
        <Link className="btn btn-light" to="/register-symptoms">Register Symptoms</Link>
      </Container>
    </>
  )
}
