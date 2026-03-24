import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

try {
  console.log('Loading landing page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

  // Scroll down to see the carousel that's now below hero
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);

  // Capture the carousel section
  console.log('Capturing carousel below hero...');
  const carouselSection = page.locator('section').filter({ hasText: 'Compatible with systems from' }).first();
  await carouselSection.screenshot({ path: '/tmp/qa_carousel_new.png' });

  console.log('Screenshot saved!');

} catch (error) {
  console.error('Error:', error.message);
} finally {
  await browser.close();
}
