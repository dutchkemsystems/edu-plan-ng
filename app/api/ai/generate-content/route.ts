import { NextRequest, NextResponse } from '../../../../src/lib/next-shim.ts';
import { curriculumEngine } from '../../../../src/lib/ai/curriculum-engine.ts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, level, term, week, topic, outputType, language } = body;

    if (!subject || !level || !topic) {
      return NextResponse.json(
        { error: 'Missing required parameters: subject, level, and topic are mandatory.' },
        { status: 400 }
      );
    }

    const termNum = parseInt(String(term || 1), 10);
    const weekNum = parseInt(String(week || 1), 10);

    const generated = await curriculumEngine.generateComprehensiveContent({
      subject,
      level,
      term: termNum,
      week: weekNum,
      topic,
      outputType: outputType || 'all',
      language: language || 'en',
    });

    return NextResponse.json({
      success: true,
      data: generated,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[API /api/ai/generate-content] Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate curriculum content.' },
      { status: 500 }
    );
  }
}
