import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Record extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artistName: string;

  @Column()
  userIp: string;

  @CreateDateColumn()
  dateRecord: Date;

}