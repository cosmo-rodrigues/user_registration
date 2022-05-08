import { IUserInfo } from '../dtos';
import { get, post, put, remove as deleteUser } from './api';

const findById = async (id: number) =>
  get({ type: 'user', service: `user/${id}` });

const findAll = async () => get({ type: 'user', service: `user/` });

const create = async (data: IUserInfo) =>
  post({ type: 'user', service: `user/`, data });

const update = async (id: number, data: IUserInfo) =>
  put({ type: 'user', service: `user/${id}`, data });

const remove = async (id: number) =>
  deleteUser({ type: 'user', service: `user/${id}` });

export const userService = {
  findById,
  findAll,
  update,
  remove,
  create,
};
