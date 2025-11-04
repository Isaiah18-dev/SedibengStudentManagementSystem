
import React, { useState } from 'react';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { generateAnnouncement } from '../../services/geminiService';

const AnnouncementGenerator: React.FC = () => {
  const [points, setPoints] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAnnouncement('');
    const result = await generateAnnouncement(points);
    setAnnouncement(result);
    setIsLoading(false);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Announcement Generator</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="points" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Key Points</label>
          <textarea id="points" value={points} onChange={e => setPoints(e.target.value)} required rows={4} placeholder="e.g., Parent-teacher meeting, Next Friday at 6 PM, School auditorium" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Announcement'}
        </Button>
      </form>
      
      {(isLoading || announcement) && (
        <div className="mt-6 p-4 border-t dark:border-gray-700">
            {isLoading ? (
                <div className="flex justify-center items-center h-32">
                    <Spinner />
                </div>
            ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {announcement.split('\n').map((line, index) => {
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

export default AnnouncementGenerator;
