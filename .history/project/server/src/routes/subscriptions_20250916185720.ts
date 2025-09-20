import { Router, Request, Response } from 'express';
import Subscription from '../models/Subscription.js';
import { sendSubscriptionSeries } from '../jobs/subscriptionEmails.js';

const router = Router();

// POST /api/subscriptions
router.post('/', async (req, res) => {
  try {
    const { email, consentText, source } = req.body;
    if (!email || !consentText) return res.status(400).json({ error: 'email and consentText are required' });

    const sub = await Subscription.create({ email, consentText, source });

    // Fire-and-forget queued email series (non-blocking)
    // In production, use a job queue like Bull/MQ/Cloud tasks
    (async () => {
      try {
        await sendSubscriptionSeries(email);
      } catch (e) {
        console.error('subscription email series failed', e);
      }
    })();

    res.status(201).json(sub);
  } catch (err) {
    console.error('subscription error', err);
    res.status(500).json({ error: 'failed to create subscription' });
  }
});

export default router;