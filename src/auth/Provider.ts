/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Util from './Util';
import * as Setting from '../Setting';
import { IProvider } from 'src/components/models/provider';
import { IMap } from 'src/components/models/base';
import { IApplication } from 'src/components/models/application';

const authInfo = {
  Google: {
    scope: 'profile+email',
    endpoint: 'https://accounts.google.com/signin/oauth',
  },
  GitHub: {
    scope: 'user:email+read:user',
    endpoint: 'https://github.com/login/oauth/authorize',
  },
  QQ: {
    scope: 'get_user_info',
    endpoint: 'https://graph.qq.com/oauth2.0/authorize',
  },
  WeChat: {
    scope: 'snsapi_login',
    endpoint: 'https://open.weixin.qq.com/connect/qrconnect',
    mpScope: 'snsapi_userinfo',
    mpEndpoint: 'https://open.weixin.qq.com/connect/oauth2/authorize'
  },
  WeChatMiniProgram: {
    endpoint: 'https://mp.weixin.qq.com/',
  },
  Facebook: {
    scope: 'email,public_profile',
    endpoint: 'https://www.facebook.com/dialog/oauth',
  },
  DingTalk: {
    scope: 'openid',
    endpoint: 'https://login.dingtalk.com/oauth2/auth',
  },
  Weibo: {
    scope: 'email',
    endpoint: 'https://api.weibo.com/oauth2/authorize',
  },
  Gitee: {
    scope: 'user_info%20emails',
    endpoint: 'https://gitee.com/oauth/authorize',
  },
  LinkedIn: {
    scope: 'r_liteprofile%20r_emailaddress',
    endpoint: 'https://www.linkedin.com/oauth/v2/authorization',
  },
  WeCom: {
    scope: 'snsapi_userinfo',
    endpoint: 'https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect',
    silentEndpoint: 'https://open.weixin.qq.com/connect/oauth2/authorize',
    internalEndpoint: 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect',
  },
  Lark: {
    // scope: 'email',
    endpoint: 'https://open.feishu.cn/open-apis/authen/v1/index',
  },
  GitLab: {
    scope: 'read_user+profile',
    endpoint: 'https://gitlab.com/oauth/authorize',
  },
  Adfs: {
    scope: 'openid',
    endpoint: 'http://example.com',
  },
  Baidu: {
    scope: 'basic',
    endpoint: 'http://openapi.baidu.com/oauth/2.0/authorize',
  },
  Alipay: {
    scope: 'basic',
    endpoint: 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm',
  },
  Casdoor: {
    scope: 'openid%20profile%20email',
    endpoint: 'http://example.com',
  },
  Infoflow: {
    endpoint: 'https://xpc.im.baidu.com/oauth2/authorize',
  },
  Apple: {
    scope: 'name%20email',
    endpoint: 'https://appleid.apple.com/auth/authorize',
  },
  AzureAD: {
    scope: 'user_impersonation',
    endpoint: 'https://login.microsoftonline.com/common/oauth2/authorize',
  },
  Slack: {
    scope: 'users:read',
    endpoint: 'https://slack.com/oauth/authorize',
  },
  Steam: {
    endpoint: 'https://steamcommunity.com/openid/login',
  },
  Custom: {
    endpoint: 'https://example.com/',
  },
} as IMap;

export function getProviderUrl(provider: IProvider) {
  if (provider.category === 'OAuth') {
    const endpoint = authInfo[provider.type].endpoint;
    const urlObj = new URL(endpoint);

    let host = urlObj.host;
    let tokens = host.split('.');
    if (tokens.length > 2) {
      tokens = tokens.slice(1);
    }
    host = tokens.join('.');

    return `${urlObj.protocol}//${host}`;
  } else {
    return Setting.OtherProviderInfo[provider.category][provider.type].url;
  }
}

export function getAuthUrl(application: IApplication, provider: IProvider, method: string) {
  if (application === null || provider === null) {
    return '';
  }
  if (provider.category === 'Email') {
    return '';
  }

  let endpoint: string = authInfo[provider.type].endpoint;
  const redirectUri = `${window.location.origin}/callback`;
  const scope: string = authInfo[provider.type].scope;
  const state: string = Util.getQueryParamsToState(application.name, provider.name, method);

  if (provider.type === 'Google') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
  } else if (provider.type === 'GitHub') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
  } else if (provider.type === 'QQ') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
  } else if (provider.type === 'WeChat') {
    if (navigator.userAgent.includes('MicroMessenger')) {
      return `${authInfo[provider.type].mpEndpoint}?appid=${provider.clientId2}&redirect_uri=${redirectUri}&state=${state}&scope=${authInfo[provider.type].mpScope}&response_type=code#wechat_redirect`;
    } else {
      return `${endpoint}?appid=${provider.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}#wechat_redirect`;
    }
  } else if (provider.type === 'Facebook') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
  } else if (provider.type === 'DingTalk') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}&prompt=consent`;
  } else if (provider.type === 'Weibo') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
  } else if (provider.type === 'Gitee') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
  } else if (provider.type === 'LinkedIn') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
  } else if (provider.type === 'WeCom') {
    if (provider.subType === 'Internal') {
      if (provider.method === 'Silent') {
        endpoint = authInfo[provider.type].silentEndpoint;
        return `${endpoint}?appid=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&response_type=code#wechat_redirect`;
      } else if (provider.method === 'Normal') {
        endpoint = authInfo[provider.type].internalEndpoint;
        return `${endpoint}?appid=${provider.clientId}&agentid=${provider.appId}&redirect_uri=${redirectUri}&state=${state}&usertype=member`;
      } else {
        return `https://error:not-supported-provider-method:${provider.method}`;
      }
    } else if (provider.subType === 'Third-party') {
      if (provider.method === 'Silent') {
        endpoint = authInfo[provider.type].silentEndpoint;
        return `${endpoint}?appid=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&response_type=code#wechat_redirect`;
      } else if (provider.method === 'Normal') {
        return `${endpoint}?appid=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}&usertype=member`;
      } else {
        return `https://error:not-supported-provider-method:${provider.method}`;
      }
    } else {
      return `https://error:not-supported-provider-sub-type:${provider.subType}`;
    }
  } else if (provider.type === 'Lark') {
    return `${endpoint}?app_id=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}`;
  } else if (provider.type === 'GitLab') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=code&scope=${scope}`;
  } else if (provider.type === 'Adfs') {
    return `${provider.domain}/adfs/oauth2/authorize?client_id=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=code&nonce=casdoor&scope=openid`;
  } else if (provider.type === 'Baidu') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=code&scope=${scope}&display=popup`;
  } else if (provider.type === 'Alipay') {
    return `${endpoint}?app_id=${provider.clientId}&scope=auth_user&redirect_uri=${redirectUri}&state=${state}&response_type=code&scope=${scope}&display=popup`;
  } else if (provider.type === 'Casdoor') {
    return `${provider.domain}/login/oauth/authorize?client_id=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=code&scope=${scope}`;
  } else if (provider.type === 'Infoflow'){
    return `${endpoint}?appid=${provider.clientId}&redirect_uri=${redirectUri}?state=${state}`
  } else if (provider.type === 'Apple') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=code&scope=${scope}&response_mode=form_post`;
  } else if (provider.type === 'AzureAD') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=code&scope=${scope}&resource=https://graph.windows.net/`;
  } else if (provider.type === 'Slack') {
    return `${endpoint}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&state=${state}&response_type=code&scope=${scope}`;
  } else if (provider.type === 'Steam') {
    return `${endpoint}?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=${window.location.origin}&openid.return_to=${redirectUri}?state=${state}`;
  } else if (provider.type === 'Custom') {
    return `${provider.customAuthUrl}?client_id=${provider.clientId}&redirect_uri=${redirectUri}&scope=${provider.customScope}&response_type=code&state=${state}`;
  }
}
