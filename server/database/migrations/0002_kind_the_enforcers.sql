DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `settings` ALTER COLUMN "mentee_registration_end_date" TO "mentee_registration_end_date" integer;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `settings` ALTER COLUMN "mentee_booking_start_date" TO "mentee_booking_start_date" integer;--> statement-breakpoint
ALTER TABLE `settings` ALTER COLUMN "mentor_calendar_end_date" TO "mentor_calendar_end_date" integer;--> statement-breakpoint
ALTER TABLE `settings` DROP COLUMN `mentee_registration_end_time`;--> statement-breakpoint
ALTER TABLE `settings` DROP COLUMN `mentee_booking_start_time`;