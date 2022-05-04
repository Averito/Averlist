import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	OneToMany
} from 'typeorm'
import { AnimeEntity } from '../anime/anime.entity'

@Entity({
	name: 'user'
})
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 100 })
	login: string

	@Column({ type: 'varchar', length: 150 })
	email: string

	@Column({ type: 'varchar', length: 200 })
	password: string

	@Column({ type: 'varchar', length: 1000 })
	description: string

	@Column({ type: 'varchar', length: 150 })
	avatar: string

	@OneToMany(() => AnimeEntity, anime => anime.user)
	@JoinTable()
	animeList: AnimeEntity[]

	@ManyToMany(() => UserEntity, user => user.id, {
		cascade: true
	})
	@JoinTable()
	friendList: number[]

	@Column({ type: 'varchar', length: 10, default: 'user' })
	role: 'user' | 'admin'
}
