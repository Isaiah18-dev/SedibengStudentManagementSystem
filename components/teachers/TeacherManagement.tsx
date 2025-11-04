
import React, { useState, useContext } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ICONS } from '../../constants';
import { DataContext } from '../../context/DataContext';
import { Teacher } from '../../types';
import AddTeacherModal from './AddTeacherModal';
import ConfirmationModal from '../ui/ConfirmationModal';

const TeacherRow: React.FC<{ 
    teacher: Teacher,
    onEdit: (teacher: Teacher) => void,
    onDelete: (teacher: Teacher) => void,
}> = ({ teacher, onEdit, onDelete }) => {
    return (
        <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{teacher.name}</td>
            <td className="px-6 py-4">{teacher.subject}</td>
            <td className="px-6 py-4">{teacher.email}</td>
            <td className="px-6 py-4 text-right">
                <Button variant="secondary" size="sm" className="mr-2" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{ICONS.EDIT}</svg>} onClick={() => onEdit(teacher)} />
                <Button variant="danger" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{ICONS.TRASH}</svg>} onClick={() => onDelete(teacher)} />
            </td>
        </tr>
    );
};

const TeacherManagement: React.FC = () => {
    const context = useContext(DataContext);
    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [teacherToEdit, setTeacherToEdit] = useState<Teacher | null>(null);
    const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

    if (!context) return null;

    const handleAddClick = () => {
        setTeacherToEdit(null);
        setAddEditModalOpen(true);
    };

    const handleEditClick = (teacher: Teacher) => {
        setTeacherToEdit(teacher);
        setAddEditModalOpen(true);
    };

    const handleDeleteClick = (teacher: Teacher) => {
        setTeacherToDelete(teacher);
    };

    const confirmDelete = () => {
        if (teacherToDelete) {
            context.setTeachers(prev => prev.filter(t => t.id !== teacherToDelete.id));
            setTeacherToDelete(null);
        }
    };

    return (
        <>
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Teacher Directory</h2>
                    <Button onClick={handleAddClick} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{ICONS.PLUS}</svg>}>Add Teacher</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Subject</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.teachers.map(teacher => (
                                <TeacherRow 
                                    key={teacher.id} 
                                    teacher={teacher}
                                    onEdit={handleEditClick}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <AddTeacherModal 
                isOpen={isAddEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                teacherToEdit={teacherToEdit}
            />
            <ConfirmationModal 
                isOpen={!!teacherToDelete}
                onClose={() => setTeacherToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Teacher"
                message={`Are you sure you want to delete ${teacherToDelete?.name}? This action cannot be undone.`}
            />
        </>
    );
};

export default TeacherManagement;
