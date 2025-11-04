
import React, { useState } from 'react';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { generateLessonPlan } from '../../services/geminiService';

const LessonPlanGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [duration, setDuration] = useState('');
  const [lessonPlan, setLessonPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLessonPlan('');
    const plan = await generateLessonPlan(topic, gradeLevel, duration);
    setLessonPlan(plan);
    setIsLoading(false);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Lesson Plan Generator</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
          <input type="text" id="topic" value={topic} onChange={e => setTopic(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Grade Level</label>
          <input type="text" id="gradeLevel" value={gradeLevel} onChange={e => setGradeLevel(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration (minutes)</label>
          <input type="text" id="duration" value={duration} onChange={e => setDuration(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Plan'}
        </Button>
      </form>
      
      {(isLoading || lessonPlan) && (
        <div className="mt-6 p-4 border-t dark:border-gray-700">
            {isLoading ? (
                <div className="flex justify-center items-center h-32">
                    <Spinner />
                </div>
            ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {lessonPlan.split('\n').map((line, index) => {
                        if (line.startsWith('#')) {
                            const level = line.match(/#/g)?.length || 1;
                            const text = line.replace(/#/g, '').trim();
                            return React.createElement(`h${level+2}`, { key: index, className: 'font-bold mt-3 mb-1' }, text);
                        }
                        if (line.startsWith('* ') || line.startsWith('- ')) {
                            return <li key={index} className="ml-4 list-disc">{line.substring(2)}</li>
                        }
                        return <p key={index}>{line}</p>;
                    })}
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default LessonPlanGenerator;
