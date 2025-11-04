
import React, { useContext } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Class } from '../../types';
import { DataContext } from '../../context/DataContext';

interface ClassDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classInfo: Class | null;
}

const ClassDetailsModal: React.FC<ClassDetailsModalProps> = ({ isOpen, onClose, classInfo }) => {
  const context = useContext(DataContext);
  
  if (!context || !classInfo) return null;
  
  const { students, teachers } = context;
  
  const teacher = teachers.find(t => t.id === classInfo.teacherId);
  const enrolledStudents = students.filter(s => s.classId === classInfo.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Details for ${classInfo.name}`}>
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Teacher</h4>
        <p className="mb-4 text-gray-600 dark:text-gray-400">{teacher?.name || 'Unassigned'}</p>
        
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Enrolled Students ({enrolledStudents.length})</h4>
        {enrolledStudents.length > 0 ? (
          <ul className="mt-2 list-disc list-inside bg-gray-50 dark:bg-gray-700/50 rounded-md p-3 max-h-48 overflow-y-auto">
            {enrolledStudents.map(student => (
              <li key={student.id} className="text-gray-700 dark:text-gray-300">{student.name}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No students are currently enrolled in this class.</p>
        )}
      </div>
       <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

export default ClassDetailsModal;
