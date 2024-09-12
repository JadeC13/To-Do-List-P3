import './css/App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navigation from './Navigation';
import Login from './users/LoginForm';

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import './css/App.css';
// import Home from './Home';
// import Navigation from './Navigation';
// import Login from './users/LoginForm';

// function App() {
//   return (
//     <div class="test">
//       <Navigation />
//       <Home />
//       <Login />
//     </div>
//   );
// }

// export default App;
