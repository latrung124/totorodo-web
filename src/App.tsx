import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{ padding: '2rem' }}>
            <h1>Totodoro</h1>
            <p>Project setup complete.</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
