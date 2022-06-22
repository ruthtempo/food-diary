import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FoodForm } from './FoodForm';
import { SymptomsComp } from './Symptoms';
import { Calendar } from './Calendar';
import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import { NavigationBar } from './NavigationBar';


export interface Food {
  type: "food",
  date: Date,
  meal: string,
  included: string[],
  foodList: string[],
  selectedTime: string,
  taste?: number,
  quality?: number,
  quantity?: number,
  overallExp?: number

}

export interface Symptoms {
  type: "symptoms",
  date: Date,
  physical: string[],
  mood: string[],
  comments: ""
}

export type Answer = Food | Symptoms



function App() {

  const [answers, setAnswers] = useState<Answer[]>([])
  console.log(answers)

  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col
            xs={12}
            md={{ span: 7, offset: 2 }}
            lg={{ span: 4, offset: 4 }}
            className="h-100">
            <div className="d-flex flex-column start">
              <Link className="btn btn-primary mb-3 mt-3" to="/register-meal">Register Meal</Link>
              <Link className="btn btn-primary" to="/register-symptoms">Register Symptoms</Link>
            </div>
          </Col>
        </Row>
        <Routes>
          <Route path="register-meal" element={<FoodForm setAnswers={setAnswers} />} />
          <Route path="/register-symptoms" element={<SymptomsComp setAnswers={setAnswers} />} />
          <Route path="/calendar" element={<Calendar answers={answers} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
