import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Header from './components/header/Header';
import Login from './pages/Login/Login';
import Tasks from './pages/Tasks/Tasks';

function App() {
  return (
    <div className='App'>
      <StyledEngineProvider injectFirst>
        <Router>
        <Header/>
          <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/tasks' element={<Tasks/>}></Route>
        </Routes>
        </Router>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
