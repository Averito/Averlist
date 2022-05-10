import { AuthGuard } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}
