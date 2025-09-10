import { drizzle } from 'drizzle-orm/libsql';

import * as schema from '../database/schema';

export function useDrizzle() {
  return drizzle({
    connection: {
      url: 'libsql://mentorship-tenutso.aws-us-east-1.turso.io',
      authToken:
        'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTc1Mjg5MDksImlkIjoiY2RiMjMxMzgtMzg2Ni00Zjc1LTgyZDUtYTM2ZTVhZDcwZmIxIiwicmlkIjoiODg1MWU2M2MtMDAwYy00MjZiLThkMDgtODAxZTNkY2EwMzJjIn0.gIWcLDWIOTvEo24WlTM8jHUnM6bRrSqA_w2NxF7yVp-amA_nIwdWKvA-lPkM_Kj-8YD5tmSiIUSOsBeKFnn1DA'
    },
    schema,
    casing: 'snake_case'
  });
}
