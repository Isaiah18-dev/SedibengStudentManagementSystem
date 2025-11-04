
import React, { useState, useEffect, useContext } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Teacher } from '../../types';
import { DataContext } from '../../context/DataContext';

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherToEdit: Teacher | null;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({ isOpen, onClose, teacherToEdit }) => {
  const context = useContext(DataContext);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (teacherToEdit) {
      setName(teacherToEdit.name);
      setSubject(teacherToEdit.subject);
      setEmail(teacherToEdit.email);
    } else {
      setName('');
      setSubject('');
      setEmail('');
    }
  }, [teacherToEdit, isOpen]);

  if (!context) return null;
  const { setTeachers } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teacherData = { name, subject, email };

    if (teacherToEdit) {
      setTeachers(prev => prev.map(t => t.id === teacherToEdit.id ? { ...t, ...teacherData } : t));
    } else {
      setTeachers(prev => [...prev, { ...teacherData, id: `t${Date.now()}` }]);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={teacherToEdit ? 'Edit Teacher' : 'Add New Teacher'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
          <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">{teacherToEdit ? 'Save Changes' : 'Add Teacher'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTeacherModal;
