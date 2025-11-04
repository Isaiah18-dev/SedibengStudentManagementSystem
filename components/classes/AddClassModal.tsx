
import React, { useState, useEffect, useContext } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Class } from '../../types';
import { DataContext } from '../../context/DataContext';

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classToEdit: Class | null;
}

const AddClassModal: React.FC<AddClassModalProps> = ({ isOpen, onClose, classToEdit }) => {
  const context = useContext(DataContext);
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState<string | null>('');

  useEffect(() => {
    if (classToEdit) {
      setName(classToEdit.name);
      setTeacherId(classToEdit.teacherId);
    } else {
      setName('');
      setTeacherId('');
    }
  }, [classToEdit, isOpen]);

  if (!context) return null;
  const { teachers, setClasses } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const classData = { name, teacherId: teacherId || null };

    if (classToEdit) {
      setClasses(prev => prev.map(c => c.id === classToEdit.id ? { ...c, ...classData } : c));
    } else {
      setClasses(prev => [...prev, { ...classData, id: `c${Date.now()}` }]);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={classToEdit ? 'Edit Class' : 'Create New Class'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="teacher" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Teacher</label>
          <select id="teacher" value={teacherId || ''} onChange={e => setTeacherId(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="">Assign a teacher</option>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">{classToEdit ? 'Save Changes' : 'Create Class'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddClassModal;
