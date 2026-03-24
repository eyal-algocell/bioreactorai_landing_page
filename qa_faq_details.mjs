import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

try {
  console.log('Loading landing page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

  // Scroll to FAQ
  const faqSection = page.locator('section').filter({ hasText: 'Common questions' }).first();
  await faqSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Click on "How long until this is real?" question
  console.log('Expanding "How long until this is real?" question...');
  const timelineQuestion = page.locator('button').filter({ hasText: 'How long until this is real?' }).first();
  await timelineQuestion.click();
  await page.waitForTimeout(500);

  // Screenshot the expanded answer
  const faqCard1 = page.locator('div').filter({ hasText: 'How long until this is real?' }).first();
  await faqCard1.screenshot({ path: '/tmp/qa_faq_timeline.png' });

  // Click on "Does this work with my SCADA vendor?" question
  console.log('Expanding "Does this work with my SCADA vendor?" question...');
  const scadaQuestion = page.locator('button').filter({ hasText: 'Does this work with my SCADA vendor?' }).first();
  await scadaQuestion.click();
  await page.waitForTimeout(500);

  // Screenshot the expanded answer
  const faqCard2 = page.locator('div').filter({ hasText: 'Does this work with my SCADA vendor?' }).first();
  await faqCard2.screenshot({ path: '/tmp/qa_faq_scada.png' });

  console.log('Screenshots saved successfully!');

} catch (error) {
  console.error('Error:', error.message);
} finally {
  await browser.close();
}
