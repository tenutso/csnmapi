import { Temporal } from 'temporal-polyfill';
import { settings } from '../../database/schema';

function formatDateTime(date: any, time: any, timezone: any) {
  const dateInstance = Temporal.Instant.from(date);
  const timeInstance = Temporal.PlainTime.from(time);
  const ZonedDatetime = dateInstance
    .toZonedDateTimeISO(timezone)
    .with({
      hour: timeInstance.hour,
      minute: timeInstance.minute
    })
    .toString();

  return ZonedDatetime;
}

export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  //const db = useDatabase();
  const db = useDrizzle();

  await db.insert(settings).values(requestBody);

  console.log(requestBody);
  /*
  await db.sql`INSERT OR REPLACE INTO settings 
  VALUES 
    ('programName', ${requestBody.programName}),
    ('orgName', ${requestBody.orgName}),
    ('contactName', ${requestBody.contactName}),
    ('contactEmail', ${requestBody.contactEmail}),
    ('contactPhone', ${requestBody.contactPhone}),
    ('backupEmail', ${requestBody.backupEmail}),
    ('menteeRegistrationEndDate', ${requestBody.menteeRegistrationEndDate}),
    ('menteeBookingStartDate',${requestBody.menteeBookingStartDate}),
    ('menteeRegistrationEndTime', ${requestBody.menteeRegistrationEndDate}),
    ('menteeBookingStartTime',${requestBody.menteeBookingStartTime}),
    ('mentorCalendarEndDate',${requestBody.mentorCalendarEndDate}),
    ('bookOnlyOnce', ${requestBody.bookOnlyOnce ? 1 : 0}),
    ('publicGallery', ${requestBody.publicGallery ? 1 : 0}),
    ('maxMentorSessions', ${requestBody.maxMentorSessions}),
    ('maxMenteeSessions', ${requestBody.maxMenteeSessions});
  `;
*/
  return true;
});
