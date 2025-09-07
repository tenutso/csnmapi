import { Temporal } from 'temporal-polyfill';

export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  let mydate = requestBody.menteeRegistrationEndDate;

  const now = Temporal.Now.plainDateTimeISO();
  console.log(requestBody);
  return true;
});
