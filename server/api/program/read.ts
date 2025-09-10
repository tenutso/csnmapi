export default defineEventHandler(async (event) => {
  const db = useDrizzle();

  const settings = await db.query.settings.findFirst();

  return settings;
});
