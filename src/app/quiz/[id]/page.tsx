'use client';

import React from 'react';
import { StudentQuizPortalPage } from '../../../pages/StudentQuizPortalPage.tsx';

export default function QuizPage({ params }: { params: { id: string } }) {
  return <StudentQuizPortalPage quizId={params.id || 'sample-quiz-01'} />;
}
