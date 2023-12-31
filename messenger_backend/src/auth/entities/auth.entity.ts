import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class AuthEntity {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  userEmail: string;

  @Column({ type: 'bytea', nullable: true })
  userImage: string;

  @Column()
  userRole: string;

  @Column()
  userGender: string;

  @Column({ nullable: true })
  password_hash: string;

  @Column({ nullable: true })
  password_reset_token: string | null;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: 'offline' }) // Default to 'offline' when a user is created
  activeStatus: string;


}