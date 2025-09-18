CREATE TABLE `settings` (
	`program_name` text,
	`org_name` text,
	`contact_name` text,
	`contact_email` text,
	`contact_phone` text,
	`backup_email` text,
	`mentee_registration_end_date` text,
	`mentee_booking_start_date` text,
	`mentee_registration_end_time` text,
	`mentee_booking_start_time` text,
	`mentor_calendar_end_date` text,
	`book_only_once` text,
	`public_gallery` text,
	`max_mentor_sessions` text,
	`max_mentee_sessions` text,
	`timezone` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`avatar` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);