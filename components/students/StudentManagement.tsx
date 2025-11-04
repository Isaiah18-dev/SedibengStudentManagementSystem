
import React, { useState, useContext } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ICONS } from '../../constants';
import { DataContext } from '../../context/DataContext';
import { Student } from '../../types';
import StudentPerformanceAnalyzer from './StudentPerformanceAnalyzer';
import AddStudentModal from './AddStudentModal';
import ConfirmationModal from '../ui/ConfirmationModal';

const StudentRow: React.FC<{ 
    student: Student, 
    onAnalyze: (student: Student) => void,
    onEdit: (student: Student) => void,
    onDelete: (student: Student) => void,
}> = ({ student, onAnalyze, onEdit, onDelete }) => {
    const context = useContext(DataContext);
    const className = context?.classes.find(c => c.id === student.classId)?.name || 'N/A';
    
    return (
        <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{student.name}</td>
            <td className="px-6 py-4">{student.age}</td>
            <td className="px-6 py-4">{student.grade}</td>
            <td className="px-6 py-4">{className}</td>
            <td className="px-6 py-4 text-right">
                <Button variant="secondary" size="sm" className="mr-2" onClick={() => onAnalyze(student)}>Analyze</Button>
                <Button variant="secondary" size="sm" className="mr-2" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{ICONS.EDIT}</svg>} onClick={() => onEdit(student)} />
                <Button variant="danger" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{ICONS.TRASH}</svg>} onClick={() => onDelete(student)} />
            </td>
        </tr>
    );
};

const StudentManagement: React.FC = () => {
    const context = useContext(DataContext);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isAnalyzerOpen, setAnalyzerOpen] = useState(false);
    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

    if (!context) return null;

    const handleAnalyzeClick = (student: Student) => {
        setSelectedStudent(student);
        setAnalyzerOpen(true);
    };

    const handleAddClick = () => {
        setStudentToEdit(null);
        setAddEditModalOpen(true);
    };

    const handleEditClick = (student: Student) => {
        setStudentToEdit(student);
        setAddEditModalOpen(true);
    };

    const handleDeleteClick = (student: Student) => {
        setStudentToDelete(student);
    };

    const confirmDelete = () => {
        if (studentToDelete) {
            context.setStudents(prev => prev.filter(s => s.id !== studentToDelete.id));
            setStudentToDelete(null);
        }
    };

    return (
        <>
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Student Roster</h2>
                    <Button onClick={handleAddClick} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{ICONS.PLUS}</svg>}>Add Student</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Age</th>
                                <th scope="col" className="px-6 py-3">Grade</th>
                                <th scope="col" className="px-6 py-3">Class</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.students.map(student => (
                                <StudentRow 
                                    key={student.id} 
                                    student={student} 
                                    onAnalyze={handleAnalyzeClick}
                                    onEdit={handleEditClick}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            {selectedStudent && (
                <StudentPerformanceAnalyzer 
                    isOpen={isAnalyzerOpen} 
                    onClose={() => setAnalyzerOpen(false)}
                    student={selectedStudent}
                />
            )}
            <AddStudentModal 
                isOpen={isAddEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                studentToEdit={studentToEdit}
            />
            <ConfirmationModal 
                isOpen={!!studentToDelete}
                onClose={() => setStudentToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Student"
                message={`Are you sure you want to delete ${studentToDelete?.name}? This action cannot be undone.`}
            />
        </>
    );
};

export default StudentManagement;
