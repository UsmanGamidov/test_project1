import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_notes' })
export class NotesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  text: string;
  
  @Column({ name: 'created_at' })
  createdAt: Date;
}

