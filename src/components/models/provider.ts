export interface IProvider {
  owner: string;
  name: string;
  createdTime: Date;
  displayName: string;
  category: string;
  type: string;
  subType: string;
  method: string;
  clientId: string;
  clientSecret: string;
  clientId2: string;
  clientSecret2: string;
  cert: string;
  customAuthUrl: string;
  customScope: string;
  customTokenUrl: string;
  customUserInfoUrl: string;
  customLogo: string;
  host: string;
  port: number;
  title: string;
  content: string;
  regionId: string;
  signName: string;
  templateCode: string;
  appId: string;
  endpoint: string;
  intranetEndpoint: string;
  domain: string;
  bucket: string;
  metadata: string;
  idP: string;
  issuerUrl: string;
  enableSignAuthnRequest: boolean;
  providerUrl: string;
}