
export interface Student {
  id: string;
  name: string;
  age: number;
  grade: number;
  classId: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
}

export interface Class {
  id: string;
  name: string;
  teacherId: string | null;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  score: number;
  assignment: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

export enum View {
  DASHBOARD = 'Dashboard',
  STUDENTS = 'Students',
  TEACHERS = 'Teachers',
  CLASSES = 'Classes',
  AI_TOOLS = 'AI Tools',
}
