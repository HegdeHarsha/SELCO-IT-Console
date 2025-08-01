
import React, { useState } from 'react';
import type { Employee } from '../types';

interface EmployeeFormProps {
  employee: Employee | null;
  onSave: (employee: Employee) => void;
  onClose: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Employee, 'id'> & { id?: string }>({
    id: employee?.id,
    name: employee?.name || '',
    designation: employee?.designation || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    department: employee?.department || '',
    photoUrl: employee?.photoUrl || '',
    linkedIn: employee?.linkedIn || '',
    website: employee?.website || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.designation && formData.phone) {
        onSave(formData as Employee);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"/>
            </div>
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
              <input type="text" name="designation" id="designation" value={formData.designation} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"/>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <input type="text" name="department" id="department" value={formData.department} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"/>
            </div>
            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">Photo URL (Optional)</label>
              <input type="url" name="photoUrl" id="photoUrl" value={formData.photoUrl} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"/>
            </div>
          </div>
          <div>
            <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL (Optional)</label>
            <input type="url" name="linkedIn" id="linkedIn" value={formData.linkedIn} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"/>
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website URL (Optional)</label>
            <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"/>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button type="submit" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-primary-hover transition-colors">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
