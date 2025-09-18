DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `settings` ALTER COLUMN "mentee_registration_end_date" TO "mentee_registration_end_date" integer DEFAULT '"2025-09-18T18:51:52.787Z"';--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `settings` ALTER COLUMN "mentee_booking_start_date" TO "mentee_booking_start_date" integer DEFAULT '"2025-09-18T18:51:52.788Z"';--> statement-breakpoint
ALTER TABLE `settings` ALTER COLUMN "mentor_calendar_end_date" TO "mentor_calendar_end_date" integer DEFAULT '"2025-09-18T18:51:52.788Z"';