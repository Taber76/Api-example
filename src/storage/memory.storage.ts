import { LoginAttempts } from './types';

export default class MemoryStorage {
  private static loginAttempts: LoginAttempts[] = [];
  private constructor() { }

  public static addLoginAttempt(username: string) {
    const index = MemoryStorage.loginAttempts.findIndex((attempt) => attempt.username === username);
    if (index !== -1) {
      if (MemoryStorage.loginAttempts[index].created_at < new Date(Date.now() - 30 * 60 * 1000)) {
        MemoryStorage.loginAttempts[index].attempts = 1;
        return 2 // rest login attempts;
      }
      MemoryStorage.loginAttempts[index].attempts += 1;
      return 3 - MemoryStorage.loginAttempts[index].attempts
    } else {
      MemoryStorage.loginAttempts.push({ username, attempts: 1, created_at: new Date() });
      return 2
    }
  }

  public static deleteLoginAttempts(username: string) {
    const index = MemoryStorage.loginAttempts.findIndex((attempt) => attempt.username === username);
    if (index !== -1) {
      MemoryStorage.loginAttempts.splice(index, 1);
    }
  }


}