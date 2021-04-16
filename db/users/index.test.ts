import { userRepository, User } from '.';

describe('Test', () => {
  it('Tests', async () => {
    const mockEmail = 'userEmail@test.com';
    const exec = jest.fn().mockResolvedValue({ email: mockEmail, password: expect.any(String), salt: expect.any(String) });
    User.findOne = jest.fn().mockReturnValue({ exec });

    const user = await userRepository.getUser('someString');

    expect(user?.email).toBe(mockEmail);
  });
});
