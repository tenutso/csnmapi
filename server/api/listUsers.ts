export default defineEventHandler(async event => {

    const db = useDatabase();
    
    const users = await db.sql`SELECT * FROM USERS`;
    
    //const requestBody = await readBody(event);
    return users.rows;
})