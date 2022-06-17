import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FoodForm } from './FoodForm';
import { Symptoms } from './Symptoms';

import './App.css';
import { ExerciseForm } from './ExerciceForm';
import { NavigationBar } from './NavigationBar';


function App() {

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
              <Button>Register How you Feel</Button>
            </div>
          </Col>
        </Row>

        <FoodForm />
        <ExerciseForm />
        <Symptoms />
      </Container>
    </>
  );
}

export default App;
