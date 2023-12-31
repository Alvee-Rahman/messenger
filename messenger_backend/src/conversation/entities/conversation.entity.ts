import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userImage: string;

  @Column()
  userName: string;

  @Column()
  activeStatus: string;
}
