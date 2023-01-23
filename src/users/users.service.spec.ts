import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

const mockUser = {
  name: 'John',
  email: 'john@gmail.com',
  password: '123456',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const usersArray = [
    {
      name: 'User #1',
      email: 'user@email.com',
      password: 'password',
    },
    {
      name: 'User #2',
      email: 'user2@email.com',
      password: 'password',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'John',
        email: 'john@gmail.com',
        password: '123456',
      }),
    );
    const newUser = await service.create({
      name: 'John',
      email: 'john@gmail.com',
      password: '123456',
    });
    expect(newUser).toEqual(mockUser);
  });
});
