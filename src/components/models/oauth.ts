export interface IOAuthParams {
  clientId: string;
  responseType: string;
  redirectUri: string;
  scope: string;
  state: string;
  nonce: string;
  challengeMethod: string;
  codeChallenge: string;
  samlRequest: string;
  relayState: string;
}
