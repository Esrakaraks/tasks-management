import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./App.css";
import Header from './components/header/Header';
import Login from './pages/Login/Login';
import Tasks from './pages/Tasks/Tasks';
import Register from './pages/Register/Register';

function App() {
  const token = useSelector(state => state.user.token);

  return (
    <div className='App'>
      <StyledEngineProvider injectFirst>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={token ? <Navigate to="/tasks" /> : <Navigate to="/register" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/register" />} />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
