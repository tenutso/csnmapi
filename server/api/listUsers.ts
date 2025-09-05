export default defineEventHandler(async event => {

    const db = useDatabase();
    
    const users = await db.sql`SELECT * FROM users`;
    
    //const requestBody = await readBody(event);
    console.log(users.rows)
    return users.rows;
})