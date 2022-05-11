import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn
} from 'typeorm'

@Entity({
	name: 'news'
})
export class NewsEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 200, nullable: true })
	picture: string

	@Column({ type: 'varchar', length: 1000, nullable: false })
	description: string

	@CreateDateColumn()
	createdAt: number

	@UpdateDateColumn()
	lastUpdate: number
}
