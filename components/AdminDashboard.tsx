import React, { useState, useRef } from 'react';
import type { Employee } from '../types';
import EmployeeForm from './EmployeeForm';
import QRCodeModal from './QRCodeModal';
import Papa from 'papaparse';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { UserPlusIcon, PencilIcon, TrashIcon, QrCodeIcon, ArrowUpOnSquareIcon, InformationCircleIcon } from './icons';

interface AdminDashboardProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ employees, setEmployees }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      setEmployees(employees.filter(e => e.id !== id));
      toast.success('Employee deleted successfully!');
    }
  };

  const handleShowQr = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsQrModalOpen(true);
  };

  const handleSave = (employee: Employee) => {
    if (employee.id) {
      setEmployees(employees.map(e => e.id === employee.id ? employee : e));
      toast.success('Employee updated successfully!');
    } else {
      setEmployees([...employees, { ...employee, id: uuidv4() }]);
      toast.success('Employee added successfully!');
    }
    setIsFormOpen(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data as Omit<Employee, 'id'>[];
          const newEmployees: Employee[] = parsedData.map(item => ({
            ...item,
            id: uuidv4(),
            photoUrl: item.photoUrl || `https://picsum.photos/seed/${item.email}/400/400`,
          }));
          
          if(newEmployees.length > 0) {
            setEmployees(prev => [...prev, ...newEmployees]);
            toast.success(`${newEmployees.length} employees imported successfully!`);
          } else {
            toast.error('Could not import any employees. Check CSV format.');
          }
        },
        error: (error) => {
          toast.error(`CSV parsing error: ${error.message}`);
        }
      });
      // Reset file input
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Employee Directory</h1>
            <p className="text-text-light mt-1">Manage digital business cards for SELCO India.</p>
        </div>
        <div className="flex gap-2">
           <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".csv"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
          >
            <ArrowUpOnSquareIcon />
            Import CSV
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-primary-hover transition-colors"
          >
            <UserPlusIcon />
            Add Employee
          </button>
        </div>
      </div>
       <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded-md mb-6 flex items-start gap-3">
          <InformationCircleIcon />
          <div>
            <p className="font-bold">CSV Import Guide</p>
            <p className="text-sm">
              Your CSV file should have headers: 
              <code className="bg-blue-100 text-blue-800 p-1 rounded text-xs">name</code>, <code className="bg-blue-100 text-blue-800 p-1 rounded text-xs">designation</code>, <code className="bg-blue-100 text-blue-800 p-1 rounded text-xs">email</code>, <code className="bg-blue-100 text-blue-800 p-1 rounded text-xs">phone</code>, <code className="bg-blue-100 text-blue-800 p-1 rounded text-xs">department</code>, and optionally <code className="bg-blue-100 text-blue-800 p-1 rounded text-xs">linkedIn</code>, <code className="bg-blue-100 text-blue-800 p-1 rounded text-xs">website</code>, and <code className="bg-blue-100 text-blue-800 p-1 rounded text-xs">photoUrl</code>.
            </p>
          </div>
        </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={employee.photoUrl || `https://i.pravatar.cc/150?u=${employee.id}`} alt={employee.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.designation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     <div className="text-sm text-gray-900">{employee.email}</div>
                     <div className="text-sm text-gray-500">{employee.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                        <button onClick={() => handleShowQr(employee)} className="text-gray-500 hover:text-primary p-1 rounded-full transition-colors" title="Show QR Code"><QrCodeIcon /></button>
                        <button onClick={() => handleEdit(employee)} className="text-gray-500 hover:text-green-600 p-1 rounded-full transition-colors" title="Edit"><PencilIcon /></button>
                        <button onClick={() => handleDelete(employee.id)} className="text-gray-500 hover:text-red-600 p-1 rounded-full transition-colors" title="Delete"><TrashIcon /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {isFormOpen && (
        <EmployeeForm
          employee={selectedEmployee}
          onSave={handleSave}
          onClose={() => setIsFormOpen(false)}
        />
      )}
      {isQrModalOpen && selectedEmployee && (
        <QRCodeModal
          employee={selectedEmployee}
          onClose={() => setIsQrModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;