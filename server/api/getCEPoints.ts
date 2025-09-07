export default defineEventHandler(async (event) => {
  let response = await fetch(
    'https://www.csnm.ca/api/client/get?key=c50fddc1-4029-4198-b0d0-9adb9dda7b8e',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Shari Bricks # (but must get from oauth user profile)
        _MEMBER_NUM_: 82932,
        fields: [
          '_MEMBER_NUM_',
          '_MEMBER_NAME_',
          'Member #',
          'CSNM Chapter',
          'First Name',
          'Last Name',
          'Address: STREET 1',
          'Address: STREET 2',
          'Address: CITY',
          'Address: PROVINCE',
          'Address: POSTAL',
          'Address: COUNTRY',
          'Phone',
          'Email',
          'CE Year',
          'Competency 1',
          'Competency 2',
          'Competency 3',
          'Competency 4',
          'Competency 5',
          'Competency 6',
          'Competency 7',
          'Competency 8',
          'Total CE Points',
          'Unique points completed',
          'Student Membership: _GROUP_NAME_',
          'Student Membership: _MEMBERSHIP_START_DATE_',
          'Student Membership: _MEMBERSHIP_END_DATE_',
          'Student Membership: _MEMBERSHIP_LAST_START_DATE_',
          'Student Membership: _MEMBERSHIP_LAST_END_DATE_',
          'Student Membership: _MEMBERSHIP_STATUS_',
          'Student Membership: _MEMBERSHIP_RENEW_',
          'Retired PD: _GROUP_NAME_',
          'Retired PD: _MEMBERSHIP_START_DATE_',
          'Retired PD: _MEMBERSHIP_END_DATE_',
          'Retired PD: _MEMBERSHIP_LAST_START_DATE_',
          'Retired PD: _MEMBERSHIP_LAST_END_DATE_',
          'Retired PD: _MEMBERSHIP_STATUS_',
          'Retired PD: _MEMBERSHIP_RENEW_',
          'Active Membership: _GROUP_NAME_',
          'Active Membership: _MEMBERSHIP_START_DATE_',
          'Active Membership: _MEMBERSHIP_END_DATE_',
          'Active Membership: _MEMBERSHIP_LAST_START_DATE_',
          'Active Membership: _MEMBERSHIP_LAST_END_DATE_',
          'Active Membership: _MEMBERSHIP_STATUS_',
          'Active Membership: _MEMBERSHIP_RENEW_',
          'Honorary Members: _GROUP_NAME_',
          'Honorary Members: _MEMBERSHIP_START_DATE_',
          'Honorary Members: _MEMBERSHIP_END_DATE_',
          'Honorary Members: _MEMBERSHIP_LAST_START_DATE_',
          'Honorary Members: _MEMBERSHIP_LAST_END_DATE_',
          'Honorary Members: _MEMBERSHIP_STATUS_',
          'Honorary Members: _MEMBERSHIP_RENEW_',
          'Corporate Membership: _GROUP_NAME_',
          'Corporate Membership: _MEMBERSHIP_START_DATE_',
          'Corporate Membership: _MEMBERSHIP_END_DATE_',
          'Corporate Membership: _MEMBERSHIP_LAST_START_DATE_',
          'Corporate Membership: _MEMBERSHIP_LAST_END_DATE_',
          'Corporate Membership: _MEMBERSHIP_STATUS_',
          'Corporate Membership: _MEMBERSHIP_RENEW_',
          'Accredited Program Membership: _GROUP_NAME_',
          'Accredited Program Membership: _MEMBERSHIP_START_DATE_',
          'Accredited Program Membership: _MEMBERSHIP_END_DATE_',
          'Accredited Program Membership: _MEMBERSHIP_LAST_START_DATE_',
          'Accredited Program Membership: _MEMBERSHIP_LAST_END_DATE_',
          'Accredited Program Membership: _MEMBERSHIP_STATUS_',
          'Accredited Program Membership: _MEMBERSHIP_RENEW_',
          'Active Membership Application: _GROUP_NAME_',
          'Active Membership Application: _MEMBERSHIP_START_DATE_',
          'Active Membership Application: _MEMBERSHIP_END_DATE_',
          'Active Membership Application: _MEMBERSHIP_LAST_START_DATE_',
          'Active Membership Application: _MEMBERSHIP_LAST_END_DATE_',
          'Active Membership Application: _MEMBERSHIP_STATUS_',
          'Active Membership Application: _MEMBERSHIP_RENEW_'
        ]
      })
    }
  );
  let result = await response.json();
  console.log(result);
  //return result;

  /*
    let response = await fetch(
    'https://www.csnm.ca/api/client/find?key=c50fddc1-4029-4198-b0d0-9adb9dda7b8e',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _CLIENT_RELATION_PRODUCT_ID_: 5615,
        _MEMBER_NUM_: 82932,
        clientRelationFilter: {
          instanceFilter: {
            Year: '2025'
          }
        }
      })
    }
  );
  let result = await response.json();
  //console.log(result);
*/

  // GET RELATION BY ID
  let response2 = await fetch(
    'https://www.csnm.ca/api/clientRelation/get?key=c50fddc1-4029-4198-b0d0-9adb9dda7b8e',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _CLIENT_RELATION_ID_: 3130027, //result[0],
        fields: ['_CLIENT_RELATION_NAME_', 'Name of the Event']
      })
    }
  );

  let result2 = await response2.json();
  console.log(result2);
  return result.result;
});

/* RETURNED
{
  "_MEMBER_NUM_": 82932,
  "_MEMBER_NAME_": "4644 Shari Bricks",
  "Member #": "4644",
  "CSNM Chapter": {
    "VALUE": "SSNM",
    "LABEL": "SSNM"
  },
  "First Name": "Shari",
  "Last Name": "Bricks",
  "Address": {
    "STREET 1": "1370 Don Mills Road, Suite 400",
    "STREET 2": "",
    "CITY": "TORONTO",
    "PROVINCE": "ON",
    "POSTAL": "M3B 3N7",
    "COUNTRY": "CA"
  },
  "Phone": "(416) 441-0400",
  "Email": "sbricks@bondexec.com",
  "CE Year": "2025",
  "Competency 1": "1",
  "Competency 2": "2",
  "Competency 3": "1",
  "Competency 4": "1",
  "Competency 5": "0",
  "Competency 6": "0",
  "Competency 7": "0",
  "Competency 8": "1",
  "Total CE Points": "6",
  "Unique points completed": "No",
  "Active Membership": {
    "_MEMBERSHIP_STATUS_": "Active",
    "_MEMBERSHIP_RENEW_": true,
    "_GROUP_NAME_": "Active Membership",
    "_MEMBERSHIP_START_DATE_": "02/04/2021 00:00",
    "_MEMBERSHIP_END_DATE_": "03/31/2026 00:00",
    "_MEMBERSHIP_LAST_START_DATE_": "04/01/2019 01:00",
    "_MEMBERSHIP_LAST_END_DATE_": "04/01/2020 01:00"
  }
}
*/
