import sum from '../utils/testSample';

describe('Testing Jest', () => {
  it('should be true', () => {
    expect(sum(2, 3)).toEqual(5);
  });
});
