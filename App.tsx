import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import EmployeeCardPage from './components/EmployeeCardPage';
import useFirebaseStorage from './useFirebaseStorage';
import type { Employee } from './types';

const App: React.FC = () => {
  const [employees, setEmployees] = useFirebaseStorage('employees', []);

  return (
    <HashRouter>
      <Routes>
        {/* Public employee view */}
        <Route path="employee/:id" element={<EmployeeCardPage employees={employees} />} />

        {/* Admin only view */}
        <Route path="admin" element={<AdminDashboard employees={employees} setEmployees={setEmployees} />} />

        {/* Redirect bare root to admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Everything else: show 404 or redirect to admin */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
