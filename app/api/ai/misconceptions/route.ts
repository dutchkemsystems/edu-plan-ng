import { NextRequest, NextResponse } from '../../../../src/lib/next-shim.ts';
import { curriculumEngine } from '../../../../src/lib/ai/curriculum-engine.ts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lessonTopic, level, subject } = body;

    if (!lessonTopic) {
      return NextResponse.json(
        { error: 'Missing required parameter: lessonTopic is mandatory.' },
        { status: 400 }
      );
    }

    const misconceptions = await curriculumEngine.generateMisconceptions(
      lessonTopic,
      level,
      subject
    );

    return NextResponse.json(misconceptions);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to generate Misconception Alerts.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const lessonTopic = url.searchParams.get('lessonTopic') || url.searchParams.get('topic');
    const level = url.searchParams.get('level') || undefined;
    const subject = url.searchParams.get('subject') || undefined;

    if (!lessonTopic) {
      return NextResponse.json(
        { error: 'Missing required parameter: lessonTopic is mandatory.' },
        { status: 400 }
      );
    }

    const misconceptions = await curriculumEngine.generateMisconceptions(lessonTopic, level, subject);
    return NextResponse.json(misconceptions);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to generate Misconception Alerts.' },
      { status: 500 }
    );
  }
}
