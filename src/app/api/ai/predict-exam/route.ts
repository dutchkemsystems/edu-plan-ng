import { NextRequest, NextResponse } from 'next/server';
import { nigerianCurriculumEngine } from '../../../../lib/ai/nigerian-curriculum-engine.ts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, level, topic, examBody, term, week } = body;

    if (!subject || !topic) {
      return NextResponse.json(
        { error: 'Both subject and topic are required for WAEC/NECO exam prediction.' },
        { status: 400 }
      );
    }

    const prediction = await nigerianCurriculumEngine.predictWaecNecoQuestions({
      subject,
      level: level || 'sss-1',
      topic,
      examBody: examBody || 'WAEC',
    });

    return NextResponse.json({
      success: true,
      standard: '10-Year WAEC/NECO Chief Examiners Syllabus Alignment',
      data: prediction,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[API /api/ai/predict-exam error]', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to predict exam questions.' },
      { status: 500 }
    );
  }
}
