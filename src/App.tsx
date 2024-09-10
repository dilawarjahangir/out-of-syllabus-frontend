import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApplicationLayout } from '@layouts';
import { HomePage, AboutPage } from '@pages';

const App: React.FC = () => {
  return (
    <Router>
      <ApplicationLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
        </Routes>
      </ApplicationLayout>
    </Router>
  );
};

export default App;
