import { z } from 'zod';

/**
 * EduPlan NG - Strict API Request Payload Validators (Zod)
 * Validates incoming client requests across Auth, Lesson Plans, Payments, and AI Co-Pilot endpoints.
 */

// 1. Authentication Validators
export const SignUpPayloadSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  schoolName: z.string().max(150).optional(),
  state: z.string().max(50).optional(),
  lga: z.string().max(50).optional(),
  assignedLevels: z.array(z.string()).optional(),
  assignedSubjects: z.array(z.string()).optional(),
});
export type SignUpPayload = z.infer<typeof SignUpPayloadSchema>;

export const SignInPayloadSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(1, 'Password is required'),
});
export type SignInPayload = z.infer<typeof SignInPayloadSchema>;

// 2. Lesson Plan CRUD Validators
export const LessonPlanPayloadSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  title: z.string().min(1, 'Topic title is required').max(200),
  level: z.string().min(1, 'Academic level is required'),
  subject: z.string().min(1, 'Subject is required'),
  term: z.union([z.number().int().min(1).max(3), z.string()]).transform((val) => typeof val === 'string' ? parseInt(val, 10) : val),
  week: z.union([z.number().int().min(1).max(13), z.string()]).transform((val) => typeof val === 'string' ? parseInt(val, 10) : val),
  duration: z.string().default('40 mins'),
  previousKnowledge: z.string().default(''),
  introduction: z.string().default(''),
  teacherActivity: z.string().default(''),
  studentActivity: z.string().default(''),
  evaluation: z.string().default(''),
  assignment: z.string().default(''),
  references: z.string().default('NERDC National Curriculum Standard'),
  objectives: z.array(z.string()).default([]),
  materials: z.array(z.string()).default([]),
  differentiatedInstruction: z.union([
    z.object({
      struggling: z.string().optional(),
      onLevel: z.string().optional(),
      advanced: z.string().optional(),
    }),
    z.string()
  ]).optional(),
  remedialTask: z.string().nullable().optional(),
  standardTask: z.string().nullable().optional(),
  advancedTask: z.string().nullable().optional(),
  instructionalMaterials: z.object({
    physical: z.array(z.string()).default([]), // e.g., "Chalkboard", "Broomsticks"
    visual3D: z.string().optional(), // e.g., "heart_model", "solar_system", "geometry_cube"
    video4K: z.string().optional(),  // e.g., "url_to_4k_video_placeholder"
  }).optional(),
  curriculumVersion: z.string().optional().default('v1.2'),
  recommendedTextbook: z.any().optional(),
  bloomTags: z.array(z.string()).optional(),
  language: z.enum(['en', 'yo', 'ig', 'ha']).default('en'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});
export type LessonPlanPayload = z.infer<typeof LessonPlanPayloadSchema>;

// 3. AI Co-Pilot Validators
export const AiSimulateClassroomSchema = z.object({
  message: z.string().min(1, 'Teacher message is required').max(1500),
  topic: z.string().min(1, 'Topic is required').max(150),
  subject: z.string().optional().default('General Studies'),
  level: z.string().optional().default('SSS 1'),
  history: z.array(
    z.object({
      role: z.enum(['user', 'model', 'assistant']),
      text: z.string(),
    })
  ).optional().default([]),
});
export type AiSimulateClassroomInput = z.infer<typeof AiSimulateClassroomSchema>;

export const AiFeynmanTestSchema = z.object({
  message: z.string().min(1, 'Explanation message is required').max(1500),
  topic: z.string().min(1, 'Topic is required').max(150),
  history: z.array(
    z.object({
      role: z.enum(['user', 'model', 'assistant']),
      text: z.string(),
    })
  ).optional().default([]),
});
export type AiFeynmanTestInput = z.infer<typeof AiFeynmanTestSchema>;

export const AiFlippedClassroomSchema = z.object({
  topic: z.string().min(1, 'Topic is required').max(150),
  subject: z.string().optional().default('General Studies'),
  level: z.string().optional().default('SSS 1'),
});
export type AiFlippedClassroomInput = z.infer<typeof AiFlippedClassroomSchema>;

export const AiReflectSchema = z.object({
  lessonTopic: z.string().min(1, 'Lesson topic is required').max(150),
  teacherObservations: z.string().min(1, 'Teacher observations are required').max(2000),
});
export type AiReflectInput = z.infer<typeof AiReflectSchema>;

export const AiDifferentiatedTasksSchema = z.object({
  topic: z.string().min(1, 'Topic is required').max(150),
  subject: z.string().optional().default('Mathematics'),
  level: z.string().optional().default('JSS 1'),
});
export type AiDifferentiatedTasksInput = z.infer<typeof AiDifferentiatedTasksSchema>;

// 4. Kora Pay Webhook Validator
export const KoraWebhookSchema = z.object({
  event: z.string(),
  reference: z.string().optional(),
  data: z.object({
    reference: z.string().optional(),
    status: z.string().optional(),
    amount: z.number().optional(),
    currency: z.string().optional(),
    customer: z.object({
      email: z.string().email().optional(),
      name: z.string().optional(),
    }).optional(),
    metadata: z.object({
      planId: z.string().optional(),
      userId: z.string().optional(),
      schoolId: z.string().nullable().optional(),
      accountType: z.string().optional(),
    }).optional(),
  }).optional(),
});
export type KoraWebhookData = z.infer<typeof KoraWebhookSchema>;
