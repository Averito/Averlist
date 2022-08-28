import { Module } from '@nestjs/common'
import { CollectionController } from './collection.controller'
import { CollectionService } from './collection.service'
import { PrismaService } from '../prisma.service'

@Module({
	controllers: [CollectionController],
	providers: [CollectionService, PrismaService]
})
export class CollectionModule {}
