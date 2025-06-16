import { pgTable, text, serial, varchar, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  subscription: boolean("subscription").default(false),
});
