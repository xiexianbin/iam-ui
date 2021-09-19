import { api } from 'src/boot/axios';
import { IToken } from 'src/components/models/token'

const enum APIUrls {
  baseUserURL = '/token/',
}

export const signin = async (): Promise<IToken[]> => {
  const token: IToken[] = await api.get(`${APIUrls.baseUserURL}`);
  return token
};
