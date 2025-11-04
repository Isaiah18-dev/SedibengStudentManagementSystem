import React, { useState, useEffect, useContext } from 'react';
import Modal from '../ui/Modal';
import { Student } from '../../types';
import { generateStudentReport } from '../../services/geminiService';
import { DataContext } from '../../context/DataContext';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const elements: React.ReactNode[] = [];
  const lines = content.split('\n');
  
  let listType: 'ul' | 'ol' | null = null;
  let listItems: React.ReactNode[] = [];

  const closeList = (key: string | number) => {
    if (listItems.length > 0) {
      if (listType === 'ul') {
          elements.push(<ul key={`list-${key}`} className="list-disc pl-5 my-2 space-y-1">{listItems}</ul>);
      } else if (listType === 'ol') {
          elements.push(<ol key={`list-${key}`} className="list-decimal pl-5 my-2 space-y-1">{listItems}</ol>);
      }
    }
    listItems = [];
    listType = null;
  };

  lines.forEach((line, i) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
        if (listType) closeList(`break-${i}`);
        return;
    }
    
    if (trimmedLine.startsWith('#')) {
      closeList(i);
      const level = trimmedLine.match(/#/g)?.length || 1;
      const text = trimmedLine.replace(/#/g, '').trim();
      const headerSize = level === 1 ? 'text-xl' : 'text-lg';
      elements.push(React.createElement(`h${level + 2}`, { key: `h-${i}`, className: `font-bold mt-4 mb-2 ${headerSize}` }, text));
    } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (listType !== 'ul') {
        closeList(i);
        listType = 'ul';
      }
      listItems.push(<li key={`li-${i}`}>{trimmedLine.substring(2)}</li>);
    } else if (trimmedLine.match(/^\d+\.\s/)) {
      if (listType !== 'ol') {
        closeList(i);
        listType = 'ol';
      }
      listItems.push(<li key={`li-${i}`}>{trimmedLine.replace(/^\d+\.\s/, '')}</li>);
    } else {
      closeList(i);
      elements.push(<p key={`p-${i}`} className="my-2">{trimmedLine}</p>);
    }
  });

  closeList('final');
  
  return <>{elements}</>;
};


const StudentPerformanceAnalyzer: React.FC<Props> = ({ isOpen, onClose, student }) => {
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(DataContext);

  useEffect(() => {
    const fetchReport = async () => {
        if (!context) return;
        setIsLoading(true);
        setReport('');
        const studentGrades = context.grades.filter(g => g.studentId === student.id);
        const studentAttendance = context.attendance.filter(a => a.studentId === student.id);
        const generatedReport = await generateStudentReport(student, studentGrades, studentAttendance);
        setReport(generatedReport);
        setIsLoading(false);
    };

    if (isOpen) {
      fetchReport();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, student, context]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Performance Report for ${student.name}`}>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-48">
          <Spinner />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Generating AI Report...</p>
        </div>
      ) : (
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 max-h-[60vh] overflow-y-auto pr-2">
          <MarkdownRenderer content={report} />
        </div>
      )}
       <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

export default StudentPerformanceAnalyzer;