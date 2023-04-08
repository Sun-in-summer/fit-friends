
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TraineeRoleGuard extends AuthGuard('trainee-role') {}



