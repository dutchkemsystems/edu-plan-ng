import React from 'react';
import LessonDetailPage from '../app/lesson/[id]/page.tsx';
import { TeacherUser, DashboardStats } from '../types/index.ts';

interface LessonViewerPageProps {
  topic?: string;
  subject?: string;
  level?: string;
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
  onOpenUpgrade?: (message: string, requiredTier?: string, title?: string) => void;
  onBack: () => void;
}

export const LessonViewerPage: React.FC<LessonViewerPageProps> = ({
  topic,
  subject,
  level,
  user,
  stats,
  onOpenUpgrade,
  onBack,
}) => {
  return (
    <LessonDetailPage
      onBack={onBack}
      user={user}
      stats={stats}
      onOpenUpgrade={onOpenUpgrade}
      initialTopic={topic || 'Transport System: Human Circulatory Anatomy & Heart Mechanics'}
      initialSubject={subject || 'Biology'}
      initialLevel={level || 'sss1'}
    />
  );
};
