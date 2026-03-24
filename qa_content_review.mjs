import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

try {
  console.log('Loading landing page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait a bit for all content to load
  await page.waitForTimeout(2000);

  // Capture Hero section
  console.log('Capturing Hero section...');
  const heroSection = page.locator('section').first();
  await heroSection.screenshot({ path: '/tmp/qa_hero_updated.png' });

  // Scroll to and screenshot Partnership section
  console.log('Capturing Partnership section...');
  const partnershipSection = page.locator('section').filter({ hasText: 'Partner with us' }).first();
  await partnershipSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await partnershipSection.screenshot({ path: '/tmp/qa_partnership_section.png' });

  // Scroll to and screenshot FAQ section
  console.log('Capturing FAQ section...');
  const faqSection = page.locator('section').filter({ hasText: 'Common questions' }).first();
  await faqSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await faqSection.screenshot({ path: '/tmp/qa_faq_section.png' });

  console.log('Screenshots saved successfully!');

} catch (error) {
  console.error('Error:', error.message);
} finally {
  await browser.close();
}
