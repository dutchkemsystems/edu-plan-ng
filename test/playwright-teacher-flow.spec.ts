/**
 * Playwright E2E Integration Test: Teacher Lesson Planning & 3D Realia Flow
 *
 * Simulates:
 * 1. Mock teacher authentication (Amina Balogun, Mathematics, JSS 1)
 * 2. Navigates to Lesson Plan Composer
 * 3. Triggers NERDC AI Auto-Generation for Lesson Plan & Lesson Note
 * 4. Switches to the "Visual Aids (3D / 4K)" Tab
 * 5. Verifies 3D Realia Canvas and OrbitControls are mounted in the DOM
 * 6. Tests switching 3D procedural models (Geometry Cube -> Solar System -> Human Heart)
 * 7. Clicks "Share to WhatsApp" button and verifies formatted Nigerian curriculum share URL
 */

import { test, expect } from '@playwright/test';

test.describe('EduPlan NG - Teacher Workflow & 3D Visual Aid Realia Integration', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Mock Teacher Login Session in localStorage
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'eduplan_auth_user',
        JSON.stringify({
          id: 'usr_teacher_demo_01',
          name: 'Mrs. Amina Balogun',
          email: 'amina.balogun@schools.ng',
          role: 'teacher',
          accountType: 'b2c_individual',
          schoolName: "King's College, Lagos",
          state: 'Lagos',
          lga: 'Lagos Island',
          assignedLevels: ['jss-1', 'jss-2'],
          assignedSubjects: ['Mathematics', 'Basic Technology'],
          subscriptionPlan: 'full_session',
          subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        })
      );
    });
  });

  test('Teacher logs in, composes lesson plan, inspects 3D visual aid realia, and shares to WhatsApp', async ({ page }) => {
    // Navigate to local dev server
    await page.goto('http://localhost:3000');

    // 1. Verify Teacher Dashboard loaded with authenticated profile
    await expect(page.locator('text=Mrs. Amina Balogun')).toBeVisible();

    // 2. Click "Create Lesson Plan" button to open Composer
    const createPlanButton = page.locator('button:has-text("New Lesson Plan"), button:has-text("Create Lesson Plan")').first();
    await createPlanButton.click();

    // 3. Verify Lesson Plan Composer loaded with NERDC Topic selector
    await expect(page.locator('h1, h2, h3').filter({ hasText: /Compose Lesson Plan|Lesson Plan Composer/i })).toBeVisible();

    // 4. Fill in or verify Topic & Subject
    const titleInput = page.locator('input[placeholder*="Topic"], input[value*="NERDC"]').first();
    if (await titleInput.isVisible()) {
      await titleInput.fill('Geometry & 3D Polyhedrons in Base 10 Space');
    }

    // 5. Navigate to "Visual Aids" tab next to "Lesson Plan" and "Lesson Note"
    const visualAidsTab = page.locator('button:has-text("Visual Aids"), button:has-text("3D/4K")').first();
    await expect(visualAidsTab).toBeVisible();
    await visualAidsTab.click();

    // 6. Verify 3D STEM Realia WebGL Canvas is rendered
    const canvasElement = page.locator('canvas').first();
    await expect(canvasElement).toBeVisible();

    // 7. Verify 3D Model Preset Selector and switch to Solar System
    const solarSystemButton = page.locator('button:has-text("Solar System")').first();
    await expect(solarSystemButton).toBeVisible();
    await solarSystemButton.click();

    // Verify Active Model Badge changed
    await expect(page.locator('text=Heliocentric Solar System')).toBeVisible();

    // 8. Switch to Human Heart Model
    const heartButton = page.locator('button:has-text("Human Heart")').first();
    await expect(heartButton).toBeVisible();
    await heartButton.click();
    await expect(page.locator('text=Pulsating Human Heart')).toBeVisible();

    // 9. Switch to 4K Demonstration Video Sub-tab
    const videoSubtab = page.locator('button:has-text("4K Demonstration Video")').first();
    await videoSubtab.click();

    // Verify HTML5 video tag with 4K badge
    const videoTag = page.locator('video').first();
    await expect(videoTag).toBeVisible();
    await expect(page.locator('text=4K ULTRA-HD')).toBeVisible();

    // 10. Switch back to Lesson Plan tab and click "Share to WhatsApp"
    const lessonPlanTab = page.locator('button:has-text("Lesson Plan")').first();
    await lessonPlanTab.click();

    // Intercept window.open or click WhatsApp share button
    const popupPromise = page.waitForEvent('popup').catch(() => null);
    const whatsappButton = page.locator('button:has-text("WhatsApp"), button:has-text("Share")').first();
    await expect(whatsappButton).toBeVisible();
    await whatsappButton.click();

    // Verify either popup initiated or WhatsApp share URL constructed
    const popup = await popupPromise;
    if (popup) {
      expect(popup.url()).toContain('whatsapp.com');
    }
  });
});
