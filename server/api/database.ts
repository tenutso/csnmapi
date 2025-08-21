export default defineEventHandler(async event => {
    
    let response = await fetch("https://www.csnm.ca/api/clientRelation/find?key=c50fddc1-4029-4198-b0d0-9adb9dda7b8e", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            _CLIENT_RELATION_PRODUCT_ID_: 5615,
            _MEMBER_NUM_: 82932,
            "clientRelationFilter": {
                
                "instanceFilter": {
                    "Year": "2025"
                }
            }
            /*
            fields: [
                "_MEMBER_NUM_",
                "_MEMBER_NAME_",
                "_MEMBER_DATE_CREATED_",
                "_MEMBER_DATE_MODIFIED_",
                "_MEMBER_CREATED_BY_",
                "_MEMBER_MODIFIED_BY_",
                "CLIENT_CONTACT_FORM_URL",
                "First Name",
                "Last Name"
            ]
                */
        })
    })
    let result = await response.json()
    console.log(result);
    return result.result;
})