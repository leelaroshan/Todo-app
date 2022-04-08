
import './App.css';
import Signup from './Components/Signup';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from 'react-router-dom';
import Login from './Components/Login';

import Navbar from './Components/Navbar';

import Todo from './Components/Todo';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
     
        
          <Route exact path="/todolist" element={<Todo />} />
       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
