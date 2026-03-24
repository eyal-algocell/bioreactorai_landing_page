import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

try {
  console.log('Loading landing page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait a bit for all images to load
  await page.waitForTimeout(2000);

  // Take full page screenshot
  console.log('Taking full page screenshot...');
  await page.screenshot({ path: '/tmp/qa_landing_full.png', fullPage: true });

  // Scroll to and screenshot ExampleScenarios section
  console.log('Capturing ExampleScenarios section...');
  const scenariosSection = page.locator('section').filter({ hasText: 'Example Scenarios' }).first();
  await scenariosSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await scenariosSection.screenshot({ path: '/tmp/qa_scenarios_section.png' });

  // Scroll to and screenshot HowItWorks section
  console.log('Capturing HowItWorks section...');
  const howItWorksSection = page.locator('section').filter({ hasText: 'Simple. Real-time. Conversational.' }).first();
  await howItWorksSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await howItWorksSection.screenshot({ path: '/tmp/qa_howitworks_section.png' });

  // Scroll to and screenshot WhatThisIsnt section
  console.log('Capturing WhatThisIsnt section...');
  const limitationsSection = page.locator('section').filter({ hasText: 'What this isn\'t' }).first();
  await limitationsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await limitationsSection.screenshot({ path: '/tmp/qa_limitations_section.png' });

  console.log('Screenshots saved successfully!');

} catch (error) {
  console.error('Error:', error.message);
} finally {
  await browser.close();
}
