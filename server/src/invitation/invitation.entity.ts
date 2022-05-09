import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { UserEntity } from '../user/user.entity'

@Entity('invitation')
export class InvitationEntity {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => UserEntity, user => user.meInvitations)
	@JoinColumn()
	invitedUser: UserEntity | number

	@ManyToOne(() => UserEntity, user => user.myInvitations)
	@JoinColumn()
	senderUser: UserEntity | number
}
