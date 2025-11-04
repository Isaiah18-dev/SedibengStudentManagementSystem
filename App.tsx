
import React, { useState, useCallback, useMemo } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import StudentManagement from './components/students/StudentManagement';
import TeacherManagement from './components/teachers/TeacherManagement';
import ClassManagement from './components/classes/ClassManagement';
import AiTools from './components/ai/AiTools';
import { View } from './types';
import { students as initialStudents, teachers as initialTeachers, classes as initialClasses, grades as initialGrades, attendance as initialAttendance } from './services/mockData';
import { DataContext } from './context/DataContext';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Mock data states
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [classes, setClasses] = useState(initialClasses);
  const [grades, setGrades] = useState(initialGrades);
  const [attendance, setAttendance] = useState(initialAttendance);

  const dataContextValue = useMemo(() => ({
    students, setStudents,
    teachers, setTeachers,
    classes, setClasses,
    grades, setGrades,
    attendance, setAttendance
  }), [students, teachers, classes, grades, attendance]);

  const renderView = useCallback(() => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard setCurrentView={setCurrentView} />;
      case View.STUDENTS:
        return <StudentManagement />;
      case View.TEACHERS:
        return <TeacherManagement />;
      case View.CLASSES:
        return <ClassManagement />;
      case View.AI_TOOLS:
        return <AiTools />;
      default:
        return <Dashboard setCurrentView={setCurrentView} />;
    }
  }, [currentView, setCurrentView]);

  return (
    <DataContext.Provider value={dataContextValue}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex text-gray-800 dark:text-gray-200">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col transition-all duration-300 md:ml-64">
          <Header currentView={currentView} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {renderView()}
          </main>
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default App;
