// __mocks__/pg.js
import { jest } from '@jest/globals';

export class Pool {
  constructor() {
    return {
      query: jest.fn(),
      connect: jest.fn(),
      end: jest.fn(),
    };
  }
}
