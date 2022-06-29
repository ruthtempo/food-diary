import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FoodForm } from './FoodForm';
import { SymptomsComp } from './Symptoms';
import { Calendar } from './Calendar';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { NavigationBar } from './NavigationBar';
import { Home } from './Home';



export interface Food {
  type: "food",
  date: Date,
  meal: string,
  included: string[],
  foodList: string[],
  selectedTime: string,
  taste: number,
  quality: number,
  quantity: number,
  overallExp: number
}

export interface Symptoms {
  type: "symptoms",
  date: Date,
  physical: string[],
  mood: string[],
  comments: ""
}

export type Answer = Food | Symptoms




function App(p: {
  savedAnswers: Answer[]
}) {



  const [answers, setAnswers] = useState<Answer[]>(p.savedAnswers)

  const addAnswer = (answer: Answer) => {
    const newAnswers = answers.concat(answer)
    setAnswers(newAnswers) //update the state
    localStorage.setItem("answers", JSON.stringify(newAnswers)) // save the whole state in localstorage (newAnswers). "answers" is stale - not yet updated state
  }

  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col
            xs={12}
            md={{ span: 7, offset: 2 }}
            lg={{ span: 4, offset: 4 }}
          >
            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="register-meal" element={<FoodForm setAnswers={addAnswer} />} />
              <Route path="register-symptoms" element={<SymptomsComp setAnswers={addAnswer} />} />
              <Route path="calendar" element={<Calendar answers={answers} />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
