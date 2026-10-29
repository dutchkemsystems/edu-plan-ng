import React from 'react';
import LessonDetailPage from '../app/lesson/[id]/page.tsx';

interface LessonViewerPageProps {
  topic?: string;
  subject?: string;
  level?: string;
  onBack: () => void;
}

export const LessonViewerPage: React.FC<LessonViewerPageProps> = ({
  topic,
  subject,
  level,
  onBack,
}) => {
  return (
    <LessonDetailPage
      onBack={onBack}
      initialTopic={topic || 'Transport System: Human Circulatory Anatomy & Heart Mechanics'}
      initialSubject={subject || 'Biology'}
      initialLevel={level || 'sss1'}
    />
  );
};
