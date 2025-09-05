export default defineEventHandler(async event => {

    const requestBody = await readBody(event);
    console.log(requestBody._MEMBER_NUM_);

    const db = useDatabase();
    await db.sql`DROP TABLE IF EXISTS users`;
    await db.sql`CREATE TABLE IF NOT EXISTS users 
        (
            "id" TEXT PRIMARY KEY,
            "firstName" TEXT, 
            "lastName" TEXT, 
            "email" TEST
        )
    `;
    await db.sql`INSERT INTO users VALUES 
        (
            ${requestBody._MEMBER_NUM_}, 
            'John', 
            'Doe', 
            ''
        )
    `;
    const { rows } = await db.sql`SELECT * FROM users`;
    

    return rows;

})