import React from 'react';
import './App.css';
import SignIn from './Components/SignIn';
import Appointments from './Components/Appointments';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <div className="container d-flex justify-content-center mt-5">
        <Route exact path="/" component={SignIn} />
        <Route path='/appointments' component={Appointments} />
      </div>
    </BrowserRouter>
  )

}

export default App;
