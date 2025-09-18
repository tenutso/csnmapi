DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `settings` ALTER COLUMN "book_only_once" TO "book_only_once" integer;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `settings` ALTER COLUMN "public_gallery" TO "public_gallery" integer;--> statement-breakpoint
ALTER TABLE `settings` ALTER COLUMN "max_mentor_sessions" TO "max_mentor_sessions" integer;--> statement-breakpoint
ALTER TABLE `settings` ALTER COLUMN "max_mentee_sessions" TO "max_mentee_sessions" integer;