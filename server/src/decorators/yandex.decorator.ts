import { UseGuards } from '@nestjs/common'
import { YandexGuard } from '@guards/yandex.guard'

export const Yandex = () => UseGuards(new YandexGuard())
