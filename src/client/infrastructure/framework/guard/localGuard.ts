import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class localAuthGuard extends AuthGuard('Local') {}
