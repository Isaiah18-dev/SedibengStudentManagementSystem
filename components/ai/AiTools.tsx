
import React from 'react';
import Card from '../ui/Card';
import LessonPlanGenerator from './LessonPlanGenerator';
import AnnouncementGenerator from './AnnouncementGenerator';

const AiTools: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">AI Assistant Tools</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Leverage the power of AI to streamline your administrative and teaching tasks.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <LessonPlanGenerator />
        </Card>
        <Card>
            <AnnouncementGenerator />
        </Card>
      </div>
    </div>
  );
};

export default AiTools;
