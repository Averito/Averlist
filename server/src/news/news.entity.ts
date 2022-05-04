import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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

	@Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	lastUpdate: number
}
