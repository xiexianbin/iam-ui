import { IProvider } from './provider';

export interface IProviderItem {
  name: string;
  canSignUp: boolean;
  canSignIn: boolean;
  canUnlink: boolean;
  prompted: boolean;
  alertType: string;
  provider: IProvider;
}
