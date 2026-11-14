import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export function normalizeNigerianPhoneNumber(phone: string): string {
  // Strip non-digits
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('234')) {
    return cleaned;
  }
  if (cleaned.startsWith('0')) {
    return '234' + cleaned.slice(1);
  }
  if (cleaned.length === 10) {
    return '234' + cleaned;
  }
  return cleaned.length ? cleaned : '2348012345678';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentName = 'Tunde Adeyemi',
      parentName = 'Mr. Adeyemi',
      parentPhone = '08031234567',
      messageType = 'academic_progress',
      topicCovered = 'Mathematics & NERDC Weekly Scheme of Work',
      performance = 'Good progress in class drills',
      remarks = 'Keep encouraging daily homework revision',
      teacherName = 'Mrs. Amina Balogun',
      schoolName = "King's College, Lagos",
      tone = 'respectful_nigerian'
    } = body;

    const normalizedPhone = normalizeNigerianPhoneNumber(parentPhone);

    let messageText = '';
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const prompt = `You are a respectful, highly professional Nigerian educator communicating with a parent via WhatsApp.
School: ${schoolName}
Teacher: ${teacherName}
Student: ${studentName}
Parent: ${parentName}
Communication Category: ${messageType}
Topic/Context: ${topicCovered}
Student Performance: ${performance}
Teacher Note/Remarks: ${remarks}

Write a culturally respectful, polite, and warm Nigerian WhatsApp message.
Rules:
1. Use appropriate respectful Nigerian salutations (e.g. "Good day, ${parentName}", "Greetings in Christ/Islam" or "Compliments of the season").
2. Clearly praise student effort or politely explain areas needing support at home.
3. Keep it concise for mobile reading (under 130 words).
4. Use standard Nigerian English with warm warmth, 2-3 appropriate emojis (📚, 🇳🇬, ✨), and conclude with the teacher's title and school signature.
5. Return ONLY the message body text. No quotation marks or explanations.`;

        const response = await ai.models.generateContent({
          model: 'gemini-4-hydrogen',
          contents: prompt,
          config: {
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          },
        });

        messageText = response.text?.trim() || '';
      } catch (geminiErr) {
        console.warn('[Parent Message API] Gemini call failed, using statutory template:', geminiErr);
      }
    }

    if (!messageText) {
      // Statutory respectful Nigerian parent message fallback
      if (messageType === 'commendation') {
        messageText = `Good day, ${parentName} Sir/Ma. 🌟\n\nWarm greetings from ${schoolName}. I am delighted to share that ${studentName} demonstrated outstanding diligence and academic excellence today in our lesson on ${topicCovered}. ${studentName} scored ${performance} and showed exceptional leadership in class.\n\nThank you for your continuous support at home. We look forward to greater heights this term!\n\nWarm regards,\n${teacherName}\n${schoolName} 📚🇳🇬`;
      } else if (messageType === 'homework_support') {
        messageText = `Good day, ${parentName} Sir/Ma. 📚\n\nGreetings from ${schoolName}. Kindly note that ${studentName} has been assigned a brief homework exercise on ${topicCovered} due tomorrow morning.\n\n${studentName} has done well (${performance}), but spending 20 minutes reviewing the worked examples in the subject notebook this evening will reinforce full mastery.\n\nThank you for your partnership in your child's education.\n\nBest regards,\n${teacherName}\n${schoolName}`;
      } else if (messageType === 'attendance') {
        messageText = `Good day, ${parentName} Sir/Ma. 🙏\n\nI hope this message meets you well. We observed that ${studentName} was not in class today for our ${topicCovered} session at ${schoolName}. We hope all is well with the family?\n\nPlease let us know if there is anything we can do to assist, and ensure ${studentName} copies today's lesson notes upon return.\n\nRespectfully,\n${teacherName}\n${schoolName}`;
      } else {
        messageText = `Good day, ${parentName} Sir/Ma. 📚\n\nWarm greetings from ${schoolName}. This is an academic update regarding ${studentName} in our current term scheme of work on ${topicCovered}.\n\nProgress: ${performance}.\nTeacher Remarks: ${remarks}.\n\nThank you for continuing to guide ${studentName} through daily evening study.\n\nRespectfully,\n${teacherName}\n${schoolName} 🇳🇬`;
      }
    }

    const waLink = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(messageText)}`;

    return NextResponse.json({
      success: true,
      data: {
        recipientName: parentName,
        recipientPhone: normalizedPhone,
        messageText,
        waLink,
        directUrl: waLink,
        platform: 'WhatsApp Autopilot NG',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[API /api/ai/parent-message error]', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate parent message.' },
      { status: 500 }
    );
  }
}
