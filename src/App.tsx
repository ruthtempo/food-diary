import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FoodForm } from './FoodForm';
import { Symptoms } from './Symptoms';

import './App.css';
import { ExerciseForm } from './ExerciceForm';
import { NavigationBar } from './NavigationBar';


export interface Food {
  type: "food",
  date: Date,
  meal: string
  foodList: string[],
  selectedTime: string
}

export interface Exercice {
  type: "exercice",
  date: Date,
  exercice: string,
  duration: string
}

export interface Symptoms {
  type: "symptoms",
  date: Date,
  physical: string[],
  mood: string[]
}

export type Answer = Food | Exercice | Symptoms



function App() {

  const [answers, setAnswers] = useState<Answer[]>([])
  console.log(answers)

  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col
            md={{ span: 7, offset: 2 }}
            lg={{ span: 4, offset: 4 }}
            className="h-100">
            <div className="d-flex flex-column start">
              <Button className='mt-3 mb-3'>Register Meal</Button>
              <Button className='mb-3'>Register Exercice</Button>
              <Button>Register Symptoms</Button>
            </div>
          </Col>
        </Row>

        <FoodForm setAnswers={setAnswers} />
        <ExerciseForm />
        <Symptoms />
      </Container>
    </>
  );
}

export default App;
