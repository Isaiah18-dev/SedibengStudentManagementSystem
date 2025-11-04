
import React, { useContext } from 'react';
import StatCard from './StatCard';
import { ICONS } from '../../constants';
import { DataContext } from '../../context/DataContext';
import Card from '../ui/Card';
import { View } from '../../types';

interface DashboardProps {
  setCurrentView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setCurrentView }) => {
    const context = useContext(DataContext);

    if (!context) {
        return <div>Loading...</div>;
    }
    
    const { students, teachers, classes } = context;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, Admin!</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Students" value={students.length} icon={ICONS.STUDENTS} color="#3B82F6" />
                <StatCard title="Total Teachers" value={teachers.length} icon={ICONS.TEACHERS} color="#10B981" />
                <StatCard title="Total Classes" value={classes.length} icon={ICONS.CLASSES} color="#F59E0B" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <ul className="divide-y dark:divide-gray-700">
                        <li className="py-3">
                            <p><span className="font-semibold">Alice Johnson</span> was added to Grade 10 Math.</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                        </li>
                        <li className="py-3">
                            <p>New teacher <span className="font-semibold">Dr. Lee</span> joined.</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                        </li>
                        <li className="py-3">
                            <p>Midterm grades for <span className="font-semibold">History</span> have been posted.</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
                        </li>
                    </ul>
                </Card>
                 <Card>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <div className="flex flex-col space-y-3">
                        <button onClick={() => setCurrentView(View.STUDENTS)} className="text-indigo-600 dark:text-indigo-400 hover:underline text-left">Add a New Student</button>
                        <button onClick={() => setCurrentView(View.CLASSES)} className="text-indigo-600 dark:text-indigo-400 hover:underline text-left">Manage Class Enrollments</button>
                        <button onClick={() => setCurrentView(View.AI_TOOLS)} className="text-indigo-600 dark:text-indigo-400 hover:underline text-left">Generate School-wide Announcement</button>
                    </div>
                </Card>
            </div>

        </div>
    );
};

export default Dashboard;
