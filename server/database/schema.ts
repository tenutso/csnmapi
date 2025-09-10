import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const settings = sqliteTable('settings', {
  programName: text(''),
  orgName: text(''),
  contactName: text(''),
  contactEmail: text(''),
  contactPhone: text(''),
  backupEmail: text(''),
  menteeRegistrationEndDate: text(''),
  menteeBookingStartDate: text(''),
  menteeRegistrationEndTime: text(''),
  menteeBookingStartTime: text(''),
  mentorCalendarEndDate: text(''),
  bookOnlyOnce: text(''),
  publicGallery: text(''),
  maxMentorSessions: text(''),
  maxMenteeSessions: text('')
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});
