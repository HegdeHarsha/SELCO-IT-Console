
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminDashboard from './components/AdminDashboard';
import EmployeeCardPage from './components/EmployeeCardPage';
import Navigate from 'react-router-dom';
import useFirebaseStorage from './useFirebaseStorage';
import type { Employee } from './types';
import Header from './components/Header';
import { DUMMY_EMPLOYEES } from './constants';

const App: React.FC = () => {
  const [employees, setEmployees] = useFirebaseStorage('employees', DUMMY_EMPLOYEES);

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 text-text-main">
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
  {/* Public employee route */}
  <Route
    path="employee/:id"
    element={<EmployeeCardPage employees={employees} />}
  />

  {/* Redirect root to /admin */}
  <Route path="/" element={<Navigate to="/admin" replace />} />

  {/* Admin console under /admin */}
  <Route
    path="admin"
    element={<AdminDashboard employees={employees} setEmployees={setEmployees} />}
  />
  
  {/* Catch-all: unknown routes redirect to /employee/:id with a default or show 404 */}
  <Route path="*" element={<Navigate to="/admin" replace />} />
</Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
