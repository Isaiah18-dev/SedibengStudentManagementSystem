
import React, { useState, useEffect, useContext } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Student } from '../../types';
import { DataContext } from '../../context/DataContext';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentToEdit: Student | null;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, studentToEdit }) => {
  const context = useContext(DataContext);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [classId, setClassId] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setAge(String(studentToEdit.age));
      setGrade(String(studentToEdit.grade));
      setClassId(studentToEdit.classId);
    } else {
      setName('');
      setAge('');
      setGrade('');
      setClassId('');
    }
  }, [studentToEdit, isOpen]);

  if (!context) return null;
  const { classes, setStudents } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = {
      name,
      age: parseInt(age, 10),
      grade: parseInt(grade, 10),
      classId,
    };

    if (studentToEdit) {
      setStudents(prev => prev.map(s => s.id === studentToEdit.id ? { ...s, ...studentData } : s));
    } else {
      setStudents(prev => [...prev, { ...studentData, id: `s${Date.now()}` }]);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={studentToEdit ? 'Edit Student' : 'Add New Student'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
          <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Grade</label>
          <input type="number" id="grade" value={grade} onChange={e => setGrade(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class</label>
          <select id="class" value={classId} onChange={e => setClassId(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="">Select a class</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">{studentToEdit ? 'Save Changes' : 'Add Student'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStudentModal;
