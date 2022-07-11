import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

import { UserEntity } from '../user/user.entity'

@Entity('anime')
export class AnimeEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 200 })
	name: string

	@ManyToOne(() => UserEntity, user => user.animeList)
	@JoinColumn()
	user: number | UserEntity

	@Column({ type: 'int' })
	status: number
}
