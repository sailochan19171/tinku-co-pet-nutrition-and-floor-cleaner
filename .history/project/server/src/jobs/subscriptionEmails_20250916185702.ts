import { getFrom, createTransport } from '../utils/mailer.js';

// Compose welcome + educational series
const topics = [
  {
    key: 'welcome',
    subject: 'Welcome to Tinku & Co. — Science-backed pet nutrition',
    html: `
      <h2>Welcome to Tinku & Co.</h2>
      <p>Thanks for subscribing! You'll receive expert tips on pet nutrition, feeding recommendations, and more.</p>
    `,
  },
  {
    key: 'nutrition-guides',
    subject: 'Nutrition Articles & Guides — Build a healthier bowl',
    html: `
      <h2>Nutrition Guides</h2>
      <ul>
        <li>How to read pet food labels</li>
        <li>Protein, fat, and fiber — what matters</li>
        <li>Hydration and portion control</li>
      </ul>
    `,
  },
  {
    key: 'life-stage',
    subject: 'Life Stage Feeding Recommendations',
    html: `
      <h2>Feeding for Every Life Stage</h2>
      <p>Puppy/Kitten, Adult, Senior — adjust nutrition to match evolving needs.</p>
    `,
  },
  {
    key: 'dietary-needs',
    subject: 'Special Dietary Needs — Allergies, digestion, and more',
    html: `
      <h2>Special Dietary Needs</h2>
      <p>Allergies, sensitive stomachs, weight management: practical frameworks for choosing diets.</p>
    `,
  },
  {
    key: 'ingredients',
    subject: 'Ingredient Glossary — Understand what’s in the bowl',
    html: `
      <h2>Ingredient Glossary</h2>
      <p>From chicken meal to salmon oil — plain-English explanations.</p>
    `,
  },
  {
    key: 'videos',
    subject: 'Video Tutorials & Webinars — Learn from experts',
    html: `
      <h2>Video Tutorials & Webinars</h2>
      <p>Watch short tutorials and deep-dive sessions on pet nutrition and care.</p>
    `,
  },
];

export async function sendSubscriptionSeries(to: string) {
  const transporter = createTransport();
  const from = getFrom();

  for (const item of topics) {
    // Send sequentially; you can replace with a queue + delays
    await transporter.sendMail({ from, to, subject: item.subject, html: item.html });
  }
}