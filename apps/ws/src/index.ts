import { Hono } from 'hono'
import { getClient, posts } from "@repo/db"

export type Env = {
    DB: D1Database;
};

const api = new Hono<{ Bindings: Env }>();
api
    .get('/posts', async (c) => {
        const db = getClient(c.env.DB);
        const result = await db.select().from(posts).all();
        return c.json(result);
    })
    .post('/posts', async (c) => {
        const db = getClient(c.env.DB);
        const { title, content } = await c.req.json();
        const result = await db
            .insert(posts)
            .values({ title, content })
            .returning();
        return c.json(result);
    });

const app = new Hono();
app.route('/api', api);

export default app; app
