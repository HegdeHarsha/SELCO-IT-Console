
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import type { Employee } from '../types';
import { generateVCard } from '../services/vcardService';
import { EmailIcon, PhoneIcon, LinkedInIcon, WebsiteIcon, DepartmentIcon, AddContactIcon } from './icons';

interface EmployeeCardPageProps {
  employees: Employee[];
}

const EmployeeCardPage: React.FC<EmployeeCardPageProps> = ({ employees }) => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | undefined | null>(null);
  const [vCardData, setVCardData] = useState<string>('');

  useEffect(() => {
    const foundEmployee = employees.find(e => e.id === id);
    setEmployee(foundEmployee);
    if (foundEmployee) {
        setVCardData(generateVCard(foundEmployee));
    }
  }, [id, employees]);

  if (employee === null) {
    // Loading state
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (employee === undefined) {
    // Not found
    return <Navigate to="/" />;
  }

  const vCardHref = `data:text/vcard;charset=utf-8,${encodeURIComponent(vCardData)}`;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-105 duration-300">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white -mt-20"
            src={employee.photoUrl || `https://i.pravatar.cc/300?u=${employee.id}`}
            alt={employee.name}
          />
          <h1 className="text-3xl font-bold text-text-main mt-4">{employee.name}</h1>
          <p className="text-primary font-semibold text-lg mt-1">{employee.designation}</p>

          <div className="w-full mt-8 space-y-4 text-left">
            <div className="flex items-center gap-4 text-text-light">
                <DepartmentIcon />
                <span className="text-text-main">{employee.department}</span>
            </div>
            <a href={`mailto:${employee.email}`} className="flex items-center gap-4 text-text-light hover:text-primary transition-colors">
                <EmailIcon />
                <span className="text-text-main">{employee.email}</span>
            </a>
            <a href={`tel:${employee.phone}`} className="flex items-center gap-4 text-text-light hover:text-primary transition-colors">
                <PhoneIcon />
                <span className="text-text-main">{employee.phone}</span>
            </a>
            {employee.linkedIn && (
                 <a href={employee.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-text-light hover:text-primary transition-colors">
                    <LinkedInIcon />
                    <span className="text-text-main">LinkedIn Profile</span>
                </a>
            )}
             {employee.website && (
                 <a href={employee.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-text-light hover:text-primary transition-colors">
                    <WebsiteIcon />
                    <span className="text-text-main">Personal Website</span>
                </a>
            )}
          </div>

          <div className="mt-8 w-full">
            <a
              href={vCardHref}
              download={`${employee.name.replace(/\s/g, '_')}.vcf`}
              className="w-full flex items-center justify-center gap-3 bg-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-primary-hover transition-transform transform hover:-translate-y-1"
            >
              <AddContactIcon />
              Add to Contacts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCardPage;
