import { ThreadPipe } from './thread.pipe';

describe('ThreadPipe', () => {
  it('create an instance', () => {
    const pipe = new ThreadPipe();
    expect(pipe).toBeTruthy();
  });
});
