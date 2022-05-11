import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	OneToMany
} from 'typeorm'
import { randomUUID } from 'crypto'
import { AnimeEntity } from '../anime/anime.entity'
import { InvitationEntity } from '../invitation/invitation.entity'

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
	animeList: Array<number | AnimeEntity>

	@ManyToMany(() => UserEntity, user => user.id, {
		cascade: true
	})
	@JoinTable()
	friendList: Array<number | UserEntity>

	@OneToMany(() => InvitationEntity, invitation => invitation.invitedUser)
	@JoinTable()
	meInvitations: Array<number | InvitationEntity>

	@OneToMany(() => InvitationEntity, invitation => invitation.senderUser)
	@JoinTable()
	myInvitations: Array<number | InvitationEntity>

	@Column({ type: 'varchar', length: 10, default: 'user' })
	role: 'user' | 'admin'

	@Column({
		type: 'uuid',
		default: randomUUID(),
		select: false
	})
	activationLink: string

	@Column({ type: 'boolean', default: false })
	isActive: boolean

	@Column({ type: 'varchar', nullable: true })
	refreshTokenHash: string
}
