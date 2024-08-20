
import { drizzle } from 'drizzle-orm/d1';


export const getClient = (foo: D1Database) => {
    return drizzle(foo)
}
