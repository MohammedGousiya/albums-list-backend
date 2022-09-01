import 'reflect-metadata';
import dotenv from "dotenv";

import app from './app';
import { getAppDataSource } from './config/db';

async function main() {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
  
  const PORT = parseInt(process.env.PORT || "3001");

  await getAppDataSource().initialize();
  
  console.log('database connected');
  
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

}

main();