import { Record } from "../entities/Record";

export const recordsService = {

  async createRecord(userIp: string, artistName: string): Promise<Record> {
    const record = new Record();
    record.userIp = userIp;
    record.artistName = artistName;
    return record.save();
  }

}