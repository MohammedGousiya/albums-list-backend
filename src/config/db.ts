import { DataSource } from "typeorm"
import { Record } from "../entities/Record"

export function getAppDataSource() {
   return new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "4000"),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Record],
    synchronize: true,
    logging: process.env.NODE_ENV === "development"
  });
}