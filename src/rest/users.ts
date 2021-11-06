import { api } from 'src/boot/axios';
import { IToken } from 'src/components/models/token'
import { IUser, IUserSignin } from 'src/components/models/users'

const enum APIUrls {
  baseUserURL = '/users/',
  signURL = '/token/'
}

export const signIn = async (userSignin: IUserSignin): Promise<IToken> => {
  console.log(userSignin)
  const token: IToken = await api.get(`${APIUrls.signURL}`)
  return token
};

export const getUser = async (username: string): Promise<IUser> => {
  let uri: string = APIUrls.baseUserURL
  if (username !== '') {
    uri = `${APIUrls.baseUserURL}${username}`
  }
  const user: IUser = await api.get(uri);
  return user
};

export const listUser = async (): Promise<IUser[]> => {
  const users: IUser[] = await api.get(`${APIUrls.baseUserURL}`);
  return users
};

