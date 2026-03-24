import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

try {
  console.log('Loading landing page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait a bit for animation to start
  await page.waitForTimeout(2000);

  // Capture the top of the page with header and logo carousel
  console.log('Capturing header and logo carousel...');
  await page.screenshot({ path: '/tmp/qa_logo_carousel.png', clip: { x: 0, y: 0, width: 1400, height: 400 } });

  // Wait for animation to progress
  await page.waitForTimeout(3000);

  // Capture again to show animation
  console.log('Capturing logo carousel mid-animation...');
  await page.screenshot({ path: '/tmp/qa_logo_carousel_animated.png', clip: { x: 0, y: 0, width: 1400, height: 400 } });

  console.log('Screenshots saved successfully!');

} catch (error) {
  console.error('Error:', error.message);
} finally {
  await browser.close();
}
