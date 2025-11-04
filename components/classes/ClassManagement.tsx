
import React, { useState, useContext } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ICONS } from '../../constants';
import { DataContext } from '../../context/DataContext';
import { Class } from '../../types';
import AddClassModal from './AddClassModal';
import ConfirmationModal from '../ui/ConfirmationModal';
import ClassDetailsModal from './ClassDetailsModal';

const ClassRow: React.FC<{ 
    classInfo: Class,
    onViewDetails: (classInfo: Class) => void,
    onEdit: (classInfo: Class) => void,
    onDelete: (classInfo: Class) => void,
}> = ({ classInfo, onViewDetails, onEdit, onDelete }) => {
    const context = useContext(DataContext);
    const teacher = context?.teachers.find(t => t.id === classInfo.teacherId);
    const studentCount = context?.students.filter(s => s.classId === classInfo.id).length || 0;

    return (
        <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{classInfo.name}</td>
            <td className="px-6 py-4">{teacher?.name || 'Unassigned'}</td>
            <td className="px-6 py-4">{studentCount}</td>
            <td className="px-6 py-4 text-right">
                <Button variant="secondary" size="sm" className="mr-2" onClick={() => onViewDetails(classInfo)}>View Details</Button>
                <Button variant="secondary" size="sm" className="mr-2" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{ICONS.EDIT}</svg>} onClick={() => onEdit(classInfo)} />
                <Button variant="danger" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{ICONS.TRASH}</svg>} onClick={() => onDelete(classInfo)} />
            </td>
        </tr>
    );
};

const ClassManagement: React.FC = () => {
    const context = useContext(DataContext);
    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [classToEdit, setClassToEdit] = useState<Class | null>(null);
    const [classToDelete, setClassToDelete] = useState<Class | null>(null);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [classToView, setClassToView] = useState<Class | null>(null);

    if (!context) return null;

    const handleAddClick = () => {
        setClassToEdit(null);
        setAddEditModalOpen(true);
    };

    const handleEditClick = (classInfo: Class) => {
        setClassToEdit(classInfo);
        setAddEditModalOpen(true);
    };

    const handleDeleteClick = (classInfo: Class) => {
        setClassToDelete(classInfo);
    };
    
    const handleViewDetailsClick = (classInfo: Class) => {
        setClassToView(classInfo);
        setDetailsModalOpen(true);
    };

    const confirmDelete = () => {
        if (classToDelete) {
            context.setClasses(prev => prev.filter(c => c.id !== classToDelete.id));
            setClassToDelete(null);
        }
    };


    return (
        <>
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Class List</h2>
                    <Button onClick={handleAddClick} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{ICONS.PLUS}</svg>}>Create Class</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Class Name</th>
                                <th scope="col" className="px-6 py-3">Teacher</th>
                                <th scope="col" className="px-6 py-3">Students</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.classes.map(classInfo => (
                                <ClassRow 
                                    key={classInfo.id} 
                                    classInfo={classInfo} 
                                    onViewDetails={handleViewDetailsClick}
                                    onEdit={handleEditClick}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <AddClassModal
                isOpen={isAddEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                classToEdit={classToEdit}
            />
            <ClassDetailsModal 
                isOpen={isDetailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                classInfo={classToView}
            />
            <ConfirmationModal 
                isOpen={!!classToDelete}
                onClose={() => setClassToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Class"
                message={`Are you sure you want to delete ${classToDelete?.name}? This action cannot be undone.`}
            />
        </>
    );
};

export default ClassManagement;
