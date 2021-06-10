import { ThreadsPipe } from './threads.pipe';

describe('ThreadsPipe', () => {
  it('create an instance', () => {
    const pipe = new ThreadsPipe();
    expect(pipe).toBeTruthy();
  });
});
