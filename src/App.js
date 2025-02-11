import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./App.css";
import Header from './components/header/Header';
import Login from './pages/Login/Login';
import Tasks from './pages/Tasks/Tasks';

function App() {
  const user = useSelector(state => state.user.user);

  return (
    <div className='App'>
      <StyledEngineProvider injectFirst>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={user ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/login" />} />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
