import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionsService {
  async getAllSessions() {
    return 'Get all sessions';
  }

  async getWorkoutSessions(workoutId: number) {
    return `Get sessions for workout ${workoutId}`;
  }

  async getSession(sessionId: number) {
    return `Get session ${sessionId}`;
  }

  async createSession() {
    return 'Create session';
  }

  async updateSession(sessionId: number) {
    return `Update session ${sessionId}`;
  }

  async deleteSession(sessionId: number) {
    return `Delete session ${sessionId}`;
  }
}
