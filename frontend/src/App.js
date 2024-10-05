import './css/App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Tasks from './Tasks';
import Navigation from './Navigation';
import Login from './users/LoginForm';
import Signup from './users/Signup';

const App = () => {

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Tasks" element={<Tasks />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
