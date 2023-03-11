import { Injectable } from '@nestjs/common';
import { FitUserMemoryRepository } from '../fit-user/fit-user-memory.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly fitUserRepository: FitUserMemoryRepository
  ) {}
}
