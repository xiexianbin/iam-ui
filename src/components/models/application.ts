import { IOrganization } from './organization';
import { IProviderItem } from './providerItem';
import { ISignupItem } from './signupItem';

export interface IApplication {
  owner: string;
  name: string;
  createdTime: Date;

  displayName: string;
  logo: string;
  homepageUrl: string;
  description: string;
  organization: string;
  cert: string;
  enablePassword: boolean;
  enableSignUp: boolean;
  enableSigninSession: boolean;
  enableCodeSignin: boolean;
  providers: IProviderItem[];
  signupItems: ISignupItem[];
  grantTypes: string[];
  organizationObj: IOrganization;

  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  tokenFormat: string;
  expireInHours: number;
  refreshExpireInHours: number;
  signupUrl: string;
  signinUrl: string;
  forgetUrl: string;
  affiliationUrl: string;
  termsOfUse: string;
  signupHtml: string;
  signinHtml: string;
}
