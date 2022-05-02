import { IAccount } from 'src/components/models/account';

export interface IAuthState {
  account: IAccount | null
  isSignin: boolean
}

function state(): IAuthState {
  return {
    account: {} as IAccount,
    isSignin: false
  }
};

export default state;
