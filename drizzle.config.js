/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://AI_Mock_Interviewer_owner:0Zq3KBLjkiVD@ep-green-king-a5k6kt42.us-east-2.aws.neon.tech/AI_Mock_Interviewer?sslmode=require',
    }
  };