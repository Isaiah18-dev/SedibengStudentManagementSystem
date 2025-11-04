
import { GoogleGenAI } from "@google/genai";
import { Student, Grade, AttendanceRecord } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key should be set.
  console.warn("API_KEY is not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateStudentReport = async (student: Student, grades: Grade[], attendance: AttendanceRecord[]): Promise<string> => {
  const prompt = `
    Analyze the academic performance and attendance of the following student and provide a concise report.
    The report should be in markdown format.

    Student Details:
    - Name: ${student.name}
    - Age: ${student.age}
    - Grade: ${student.grade}

    Grades:
    ${grades.map(g => `- ${g.assignment} (${g.subject}): ${g.score}%`).join('\n')}

    Attendance:
    ${attendance.map(a => `- ${a.date}: ${a.status}`).join('\n')}

    Analysis:
    Based on the data, provide:
    1.  A brief overall summary of the student's performance.
    2.  Identify key strengths.
    3.  Identify areas for improvement.
    4.  Suggest actionable recommendations for the student, teachers, and parents.
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating student report:", error);
    return "Error: Could not generate the student report. Please check the API key and network connection.";
  }
};

export const generateLessonPlan = async (topic: string, gradeLevel: string, duration: string): Promise<string> => {
    const prompt = `
    Create a detailed lesson plan in markdown format for the following criteria:

    - Topic: ${topic}
    - Grade Level: ${gradeLevel}
    - Class Duration: ${duration} minutes

    The lesson plan should include:
    1.  **Learning Objectives:** What students should know or be able to do by the end of the lesson.
    2.  **Materials:** A list of required materials.
    3.  **Lesson Activities (with timeline):** A step-by-step breakdown of activities (e.g., Introduction, Direct Instruction, Guided Practice, Independent Work, Assessment, Wrap-up).
    4.  **Differentiation:** Suggestions for supporting struggling students and challenging advanced learners.
    5.  **Assessment:** How to measure student understanding.
    `;

    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating lesson plan:", error);
        return "Error: Could not generate the lesson plan.";
    }
};

export const generateAnnouncement = async (points: string): Promise<string> => {
    const prompt = `
    Write a professional and clear school announcement in markdown format based on these key points.
    The tone should be formal but friendly.

    Key Points:
    ${points}

    Expand on these points to create a full announcement suitable for sending to parents and staff.
    Include a clear subject line.
    `;
    
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating announcement:", error);
        return "Error: Could not generate the announcement.";
    }
};
