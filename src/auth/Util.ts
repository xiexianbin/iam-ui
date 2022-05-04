/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Notify } from 'quasar'
import { IOAuthParams } from 'src/components/models/oauth';

export function showMessage(type: string, text: string) {
  console.log(type, text)

  if (type === 'success') {
    Notify.create({
      message: text,
      color: 'positive'
    })
  } else if (type === 'error') {
    Notify.create({
      message: text,
      color: 'negative'
    })
  } else {
    Notify.create({
      message: text,
      color: 'warning'
    })
  }
}

function getRefinedValue(value: string | null){
  return (value === null) ? '' : value
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getOAuthGetParameters(params: any) {
  const queries = (params !== undefined) ? params : new URLSearchParams(window.location.search);
  const clientId = getRefinedValue(queries.get('client_id'));
  const responseType = getRefinedValue(queries.get('response_type'));
  const redirectUri = getRefinedValue(queries.get('redirect_uri'));
  const scope = getRefinedValue(queries.get('scope'));
  const state = getRefinedValue(queries.get('state'));
  const nonce = getRefinedValue(queries.get('nonce'));
  const challengeMethod = getRefinedValue(queries.get('code_challenge_method'));
  const codeChallenge = getRefinedValue(queries.get('code_challenge'));
  const samlRequest = getRefinedValue(queries.get('SAMLRequest'));
  const relayState = getRefinedValue(queries.get('RelayState'));

  if ((clientId === undefined || clientId === null || clientId === '') && (samlRequest === '' || samlRequest === undefined)) {
    // login
    return null;
  } else {
    // code
    return {
      clientId: clientId,
      responseType: responseType,
      redirectUri: redirectUri,
      scope: scope,
      state: state,
      nonce: nonce,
      challengeMethod: challengeMethod,
      codeChallenge: codeChallenge,
      samlRequest: samlRequest,
      relayState: relayState,
    } as IOAuthParams;
  }
}

export function getQueryParamsToState(applicationName: string, providerName: string, method: string) {
  let query = window.location.search;
  query = `${query}&application=${applicationName}&provider=${providerName}&method=${method}`;
  if (method === 'link') {
    query = `${query}&from=${window.location.pathname}`;
  }
  return btoa(query);
}

export function stateToGetQueryParams(state: string) {
  return atob(state);
}
