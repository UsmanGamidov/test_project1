import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_notes' })
export class NotesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number

  @Column()
  text: string;
  
  @Column({ name: 'created_at' })
  createdAt: Date;
}

