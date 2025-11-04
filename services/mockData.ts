
import { Student, Teacher, Class, Grade, AttendanceRecord } from '../types';

export const students: Student[] = [
  { id: 's1', name: 'Alice Johnson', age: 16, grade: 10, classId: 'c1' },
  { id: 's2', name: 'Bob Smith', age: 17, grade: 11, classId: 'c2' },
  { id: 's3', name: 'Charlie Brown', age: 15, grade: 10, classId: 'c1' },
  { id: 's4', name: 'Diana Prince', age: 18, grade: 12, classId: 'c3' },
  { id: 's5', name: 'Ethan Hunt', age: 17, grade: 11, classId: 'c2' },
];

export const teachers: Teacher[] = [
  { id: 't1', name: 'Mr. Davis', subject: 'Mathematics', email: 'davis@school.com' },
  { id: 't2', name: 'Ms. Garcia', subject: 'History', email: 'garcia@school.com' },
  { id: 't3', name: 'Dr. Lee', subject: 'Science', email: 'lee@school.com' },
];

export const classes: Class[] = [
  { id: 'c1', name: 'Grade 10 Math', teacherId: 't1' },
  { id: 'c2', name: 'Grade 11 History', teacherId: 't2' },
  { id: 'c3', name: 'Grade 12 Science', teacherId: 't3' },
];

export const grades: Grade[] = [
    { id: 'g1', studentId: 's1', subject: 'Mathematics', score: 85, assignment: 'Midterm Exam' },
    { id: 'g2', studentId: 's1', subject: 'Mathematics', score: 92, assignment: 'Final Project' },
    { id: 'g3', studentId: 's2', subject: 'History', score: 78, assignment: 'Essay' },
    { id: 'g4', studentId: 's3', subject: 'Mathematics', score: 65, assignment: 'Midterm Exam' },
    { id: 'g5', studentId: 's4', subject: 'Science', score: 95, assignment: 'Lab Report' },
    { id: 'g6', studentId: 's1', subject: 'History', score: 88, assignment: 'Presentation' },
];

export const attendance: AttendanceRecord[] = [
    { id: 'a1', studentId: 's1', date: '2023-10-01', status: 'Present' },
    { id: 'a2', studentId: 's1', date: '2023-10-02', status: 'Present' },
    { id: 'a3', studentId: 's3', date: '2023-10-01', status: 'Absent' },
    { id: 'a4', studentId: 's3', date: '2023-10-02', status: 'Late' },
    { id: 'a5', studentId: 's1', date: '2023-10-03', status: 'Present' },
];
