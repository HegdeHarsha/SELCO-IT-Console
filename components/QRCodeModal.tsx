
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Employee } from '../types';
import toast from 'react-hot-toast';

interface QRCodeModalProps {
  employee: Employee;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ employee, onClose }) => {
  const url = `${window.location.origin}${window.location.pathname}#/employee/${employee.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
        toast.success('URL copied to clipboard!');
    }, () => {
        toast.error('Failed to copy URL.');
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-8 text-center relative" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-2">Share Card for {employee.name}</h2>
        <p className="text-text-light mb-6">Scan the QR code or copy the link.</p>
        <div className="p-4 bg-gray-100 rounded-lg inline-block">
          <QRCodeSVG value={url} size={256} level="H" />
        </div>
        <div className="mt-6">
            <input 
                type="text" 
                value={url} 
                readOnly 
                className="w-full bg-secondary text-text-light p-2 border border-gray-300 rounded-md text-sm text-center"
            />
            <button 
                onClick={copyToClipboard} 
                className="mt-4 w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-primary-hover transition-colors"
            >
                Copy Link
            </button>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;
