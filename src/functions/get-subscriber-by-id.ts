import { db } from '../drizzle/client.js';
import { eq } from 'drizzle-orm';
import { subscriptions } from '../drizzle/schema/subscriptions.js';

interface GetSubscriberByIdParams {
  subscriberId: string;
}

export async function getSubscriberById({ subscriberId }: GetSubscriberByIdParams) {
  const result = await db.select().from(subscriptions).where(eq(subscriptions.id, subscriberId));

  return { subscriber: result[0] || null };
}
