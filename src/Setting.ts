/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApplication } from './components/models/application';
import { IMap } from './components/models/base';
import { IProviderItem } from './components/models/providerItem';
import { IUser } from './components/models/user';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const ServerUrl = process.env.API;
export const SessionName = 'iam_session_id';
export const ApplicationName = 'app-built-in';

// export const StaticBaseUrl = 'https://cdn.jsdelivr.net/gh/casbin/static';
export const StaticBaseUrl = '';

export const OtherProviderInfo = {
  SMS: {
    'Aliyun SMS': {
      logo: `${StaticBaseUrl}/img/social_aliyun.png`,
      url: 'https://aliyun.com/product/sms',
    },
    'Tencent Cloud SMS': {
      logo: `${StaticBaseUrl}/img/social_tencent_cloud.jpg`,
      url: 'https://cloud.tencent.com/product/sms',
    },
    'Volc Engine SMS': {
      logo: `${StaticBaseUrl}/img/social_volc_engine.jpg`,
      url: 'https://www.volcengine.com/products/cloud-sms',
    },
    'Huawei Cloud SMS': {
      logo: `${StaticBaseUrl}/img/social_huawei.png`,
      url: 'https://www.huaweicloud.com/product/msgsms.html',
    },
  },
  Email: {
    'Default': {
      logo: `${StaticBaseUrl}/img/social_default.png`,
      url: '',
    },
  },
  Storage: {
    'Local File System': {
      logo: `${StaticBaseUrl}/img/social_file.png`,
      url: '',
    },
    'AWS S3': {
      logo: `${StaticBaseUrl}/img/social_aws.png`,
      url: 'https://aws.amazon.com/s3',
    },
    'Aliyun OSS': {
      logo: `${StaticBaseUrl}/img/social_aliyun.png`,
      url: 'https://aliyun.com/product/oss',
    },
    'Tencent Cloud COS': {
      logo: `${StaticBaseUrl}/img/social_tencent_cloud.jpg`,
      url: 'https://cloud.tencent.com/product/cos',
    },
  },
  SAML: {
    'Aliyun IDaaS': {
      logo: `${StaticBaseUrl}/img/social_aliyun.png`,
      url: 'https://aliyun.com/product/idaas'
    },
    'Keycloak': {
      logo: `${StaticBaseUrl}/img/social_keycloak.png`,
      url: 'https://www.keycloak.org/'
    },
  },
  Payment: {
    'Alipay': {
      logo: `${StaticBaseUrl}/img/payment_alipay.png`,
      url: 'https://www.alipay.com/'
    },
    'WeChat Pay': {
      logo: `${StaticBaseUrl}/img/payment_wechat_pay.png`,
      url: 'https://pay.weixin.qq.com/'
    },
    'PayPal': {
      logo: `${StaticBaseUrl}/img/payment_paypal.png`,
      url: 'https://www.paypal.com/'
    },
    'GC': {
      logo: `${StaticBaseUrl}/img/payment_gc.png`,
      url: 'https://gc.org'
    },
  },
} as IMap;

export function initServerUrl() {
  //const hostname = window.location.hostname;
  // if (hostname === 'localhost') {
  //   ServerUrl = `http://${hostname}:8000`;
  // }
}

export function isLocalhost() {
  const hostname = window.location.hostname;
  return hostname === 'localhost';
}

export function getFullServerUrl() {
  let fullServerUrl = window.location.origin;
  if (fullServerUrl === 'http://localhost:7001') {
    fullServerUrl = 'http://localhost:8000';
  }
  return fullServerUrl;
}

export function isProviderVisible(providerItem: IProviderItem) {
  if (providerItem.provider === undefined || providerItem.provider === null) {
    return false;
  }

  if (providerItem.provider.category !== 'OAuth' && providerItem.provider.category !== 'SAML') {
    return false;
  }

  if (providerItem.provider.type === 'WeChatMiniProgram'){
    return false
  }

  return true;
}

export function isProviderVisibleForSignUp(providerItem: IProviderItem) {
  if (providerItem.canSignUp === false) {
    return false;
  }

  return isProviderVisible(providerItem);
}

export function isProviderVisibleForSignIn(providerItem: IProviderItem) {
  if (providerItem.canSignIn === false) {
    return false;
  }

  return isProviderVisible(providerItem);
}

export function isProviderPrompted(providerItem: IProviderItem) {
  return isProviderVisible(providerItem) && providerItem.prompted;
}

export function getAllPromptedProviderItems(application: IApplication) {
  return application.providers.filter((providerItem: IProviderItem) => isProviderPrompted(providerItem));
}

export function getSignupItem(application: IApplication, itemName: string) {
  const signupItems = application.signupItems?.filter((signupItem: { name: string; }) => signupItem.name === itemName);
  if (signupItems.length === 0) {
    return null;
  }
  return signupItems[0];
}

export function isValidPersonName(personName: string) {
  // https://blog.css8.cn/post/14210975.html
  const personNameRegex = /^[\u4e00-\u9fa5]{2,6}$/;
  return personNameRegex.test(personName);
}

export function isValidIdCard(idCard: string) {
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/;
  return idCardRegex.test(idCard);
}

export function isValidEmail(email: string) {
  // https://github.com/yiminghe/async-validator/blob/057b0b047f88fac65457bae691d6cb7c6fe48ce1/src/rule/type.ts#L9
  const emailRegex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string) {
  if (phone === '') {
    return false;
  }

  // https://learnku.com/articles/31543, `^s*$` filter empty email individually.
  const phoneRegex = /^\s*$|^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
  return phoneRegex.test(phone);
}

export function isValidInvoiceTitle(invoiceTitle: string) {
  if (invoiceTitle === '') {
    return false;
  }

  // https://blog.css8.cn/post/14210975.html
  const invoiceTitleRegex = /^[\(\)\（\）\u4e00-\u9fa5]{0,50}$/;
  return invoiceTitleRegex.test(invoiceTitle);
}

export function isValidTaxId(taxId: string) {
  // https://www.codetd.com/article/8592083
  const regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i];
  for (let i = 0; i < regArr.length; i++) {
    if (regArr[i].test(taxId)) {
      return true;
    }
  }
  return false;
}

export function isAffiliationPrompted(application: IApplication) {
  const signupItem = getSignupItem(application, 'Affiliation');
  if (signupItem === null) {
    return false;
  }

  return signupItem.prompted;
}

export function hasPromptPage(application: IApplication) {
  const providerItems = getAllPromptedProviderItems(application);
  if (providerItems.length !== 0) {
    return true;
  }

  return isAffiliationPrompted(application);
}

function isAffiliationAnswered(user: IUser, application: IApplication) {
  if (!isAffiliationPrompted(application)) {
    return true;
  }

  if (user === null) {
    return false;
  }
  return user.affiliation !== '';
}

function isProviderItemAnswered(user: any, application: IApplication, providerItem: IProviderItem) {
  if (user === null) {
    return false;
  }

  const provider = providerItem.provider;
  const linkedValue = user[provider.type.toLowerCase()];
  return linkedValue !== undefined && linkedValue !== '';
}

export function isPromptAnswered(user: IUser | null | undefined, application: IApplication) {
  if (user === undefined || user === null) {
    return false
  }

  if (!isAffiliationAnswered(user, application)) {
    return false;
  }

  const providerItems = getAllPromptedProviderItems(application);
  for (let i = 0; i < providerItems.length; i ++) {
    if (!isProviderItemAnswered(user, application, providerItems[i])) {
      return false;
    }
  }
  return true;
}

export function parseJson(s: string) {
  if (s === '') {
    return null;
  } else {
    return JSON.parse(s);
  }
}

export function myParseInt(i: string) {
  const res = parseInt(i);
  return isNaN(res) ? 0 : res;
}

export function openLink(link: string) {
  // this.props.history.push(link);
  const w = window.open('about:blank');
  if (w != null) {
    w.location.href = link;
  }
}

export function openLinkSafe(link: string) {
  // Javascript window.open issue in safari
  // https://stackoverflow.com/questions/45569893/javascript-window-open-issue-in-safari
  const a = document.createElement('a');
  a.href = link;
  a.setAttribute('target', '_blank');
  a.click();
}

export function goToLink(link: string) {
  window.location.href = link;
}

export function goToLinkSoft(ths: { props: { history: any[]; }; }, link: string) {
  if (link.startsWith('http')) {
    openLink(link);
    return;
  }

  ths.props.history.push(link);
}

export function isAdminUser(account: { owner: string; isGlobalAdmin: boolean; } | null | undefined) {
  if (account === undefined || account === null) {
    return false;
  }
  return account.owner === 'built-in' || account.isGlobalAdmin === true;
}

export function deepCopy(obj: any) {
  return Object.assign({}, obj);
}

export function addRow(array: any, row: any) {
  return [...array, row];
}

export function prependRow(array: any, row: any) {
  return [row, ...array];
}

export function deleteRow(array: string | any[], i: number) {
  // return array = array.slice(0, i).concat(array.slice(i + 1));
  return [...array.slice(0, i), ...array.slice(i + 1)];
}

export function swapRow(array: string | any[], i: number, j: number) {
  return [...array.slice(0, i), array[j], ...array.slice(i + 1, j), array[i], ...array.slice(j + 1)];
}

export function trim(str: string | any[] | undefined, ch: any) {
  if (str === undefined) {
    return undefined;
  }

  let start = 0;
  let end = str.length;

  while(start < end && str[start] === ch)
    ++start;

  while(end > start && str[end - 1] === ch)
    --end;

  return (start > 0 || end < str.length) ? str.slice(start, end) : str;
}

export function isMobile() {
  return false;
}

export function getFormattedDate(date: string | undefined) {
  if (date === undefined) {
    return null;
  }

  date = date.replace('T', ' ');
  date = date.replace('+08:00', ' ');
  return date;
}

export function getFormattedDateShort(date: string | any[]) {
  return date.slice(0, 10);
}

export function getShortName(s: string) {
  return s.split('/').slice(-1)[0];
}

export function getShortText(s: string | any[], maxLength=35) {
  if (s.length > maxLength) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${s.slice(0, maxLength)}...`;
  } else {
    return s;
  }
}

export function getFriendlyFileSize(size: string | number) {
  if (size < 1024) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return size + ' B';
  }

  // let i = Math.floor(Math.log(size) / Math.log(1024));
  // let num = (size / Math.pow(1024, i));
  // let round = Math.round(num);
  // num = round < 10 ? num.toFixed(2) : round < 100 ? num.toFixed(1) : round;
  // return `${num} ${'KMGTPEZY'[i-1]}B`;
}

function getRandomInt(s: string) {
  let hash = 0;
  if (s.length !== 0) {
    for (let i = 0; i < s.length; i ++) {
      const char = s.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
  }

  return hash;
}

export function getAvatarColor(s: any) {
  const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  let random = getRandomInt(s);
  if (random < 0) {
    random = -random;
  }
  return colorList[random % 4];
}

export function getProviderTypeOptions(category: string) {
  if (category === 'OAuth') {
    return (
      [
        {id: 'Google', name: 'Google'},
        {id: 'GitHub', name: 'GitHub'},
        {id: 'QQ', name: 'QQ'},
        {id: 'WeChat', name: 'WeChat'},
        {id: 'WeChatMiniProgram', name: 'WeChat Mini Program'},
        {id: 'Facebook', name: 'Facebook'},
        {id: 'DingTalk', name: 'DingTalk'},
        {id: 'Weibo', name: 'Weibo'},
        {id: 'Gitee', name: 'Gitee'},
        {id: 'LinkedIn', name: 'LinkedIn'},
        {id: 'WeCom', name: 'WeCom'},
        {id: 'Lark', name: 'Lark'},
        {id: 'GitLab', name: 'GitLab'},
        {id: 'Adfs', name: 'Adfs'},
        {id: 'Baidu', name: 'Baidu'},
        {id: 'Alipay', name: 'Alipay'},
        {id: 'Casdoor', name: 'Casdoor'},
        {id: 'Infoflow', name: 'Infoflow'},
        {id: 'Apple', name: 'Apple'},
        {id: 'AzureAD', name: 'AzureAD'},
        {id: 'Slack', name: 'Slack'},
        {id: 'Steam', name: 'Steam'},
        {id: 'Custom', name: 'Custom'},
      ]
    );
  } else if (category === 'Email') {
    return (
      [
        {id: 'Default', name: 'Default'},
      ]
    );
  } else if (category === 'SMS') {
    return (
      [
        {id: 'Aliyun SMS', name: 'Aliyun SMS'},
        {id: 'Tencent Cloud SMS', name: 'Tencent Cloud SMS'},
        {id: 'Volc Engine SMS', name: 'Volc Engine SMS'},
        {id: 'Huawei Cloud SMS', name: 'Huawei Cloud SMS'},
      ]
    );
  } else if (category === 'Storage') {
    return (
      [
        {id: 'Local File System', name: 'Local File System'},
        {id: 'AWS S3', name: 'AWS S3'},
        {id: 'Aliyun OSS', name: 'Aliyun OSS'},
        {id: 'Tencent Cloud COS', name: 'Tencent Cloud COS'},
      ]
    );
  } else if (category === 'SAML') {
    return ([
      {id: 'Aliyun IDaaS', name: 'Aliyun IDaaS'},
      {id: 'Keycloak', name: 'Keycloak'},
    ]);
  } else if (category === 'Payment') {
    return ([
      {id: 'Alipay', name: 'Alipay'},
      {id: 'WeChat Pay', name: 'WeChat Pay'},
      {id: 'PayPal', name: 'PayPal'},
      {id: 'GC', name: 'GC'},
    ]);
  } else {
    return [];
  }
}

export function getProviderSubTypeOptions(type: string) {
  if (type === 'WeCom' || type === 'Infoflow') {
    return (
      [
        {id: 'Internal', name: 'Internal'},
        {id: 'Third-party', name: 'Third-party'},
      ]
    );
  } else {
    return [];
  }
}

export function renderLogo(application: { homepageUrl: string; } | null) {
  if (application === null) {
    return null;
  }

  console.log('function renderLogo')
}

export function goToLogin(ths: any, application: any) {
  if (application === null) {
    return;
  }

  if (!application.enablePassword && window.location.pathname.includes('/signup/oauth/authorize')) {
    const link = window.location.href.replace('/signup/oauth/authorize', '/login/oauth/authorize');
    goToLink(link);
    return;
  }

  console.log('function goToLogin')
  if ('authConfig.appName' === application.name) {
    goToLinkSoft(ths, '/login');
  } else {
    if (application.signinUrl === '') {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      goToLink(`${application.homepageUrl}/login`);
    } else {
      goToLink(application.signinUrl);
    }
  }
}

export function goToSignup(ths: any, application: any) {
  if (application === null) {
    return;
  }

  if (!application.enablePassword && window.location.pathname.includes('/login/oauth/authorize')) {
    const link = window.location.href.replace('/login/oauth/authorize', '/signup/oauth/authorize');
    goToLink(link);
    return;
  }

  console.log('function goToLogin')
  if ('authConfig.appName' === application.name) {
    goToLinkSoft(ths, '/signup');
  } else {
    if (application.signupUrl === '') {
      goToLinkSoft(ths, `/signup/${application.name}`);
    } else {
      goToLink(application.signupUrl);
    }
  }
}

export function goToForget(ths: any, application: { name: any; forgetUrl: string; } | null) {
  if (application === null) {
    return;
  }

  console.log('function goToForget')
  if ('authConfig.appName' === application.name) {
    goToLinkSoft(ths, '/forget');
  } else {
    if (application.forgetUrl === '') {
      goToLinkSoft(ths, `/forget/${application.name}`);
    } else {
      goToLink(application.forgetUrl);
    }
  }
}

// function repeat(str: string, len: number) {
//   while (str.length < len) {
//     str += str.substr(0, len - str.length);
//   }
//   return str;
// }

// function maskString(s: string | any[]) {
//   if (s.length <= 2) {
//     return s;
//   } else {
//     return `${s[0]}${repeat('*', s.length - 2)}${s[s.length - 1]}`;
//   }
// }

export function getMaskedPhone(s: string) {
  return s.replace(/(\d{3})\d*(\d{4})/,'$1****$2');
}

export function getMaskedEmail(email: string) {
  if (email === '') return;
  const tokens = email.split('@');
  const username = tokens[0];
  // username = maskString(username);

  const domain = tokens[1];
  const domainTokens = domain.split('.');
  // domainTokens[domainTokens.length - 2] = maskString(domainTokens[domainTokens.length - 2]);

  return `${username}@${domainTokens.join('.')}`;
}

export function getArrayItem(array: any[], key: string | number, value: any) {
  const res = array.filter((item: { [x: string]: any; }) => item[key] === value)[0];
  return res;
}

export function getDeduplicatedArray(array: any[], filterArray: { filter: (arg0: (filterItem: any) => boolean) => { (): any; new(): any; length: number; }; }, key: string | number) {
  const res = array.filter((item: { [x: string]: any; }) => filterArray.filter((filterItem: { [x: string]: any; }) => filterItem[key] === item[key]).length === 0);
  return res;
}

export function getNewRowNameForTable(table: { filter: (arg0: (row: any) => any) => { (): any; new(): any; length: any; }; }, rowName: any) {
  const emptyCount = table.filter((row: { name: string | any[]; }) => row.name.includes(rowName)).length;
  let res = rowName;
  for (let i = 0; i < emptyCount; i ++) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    res = res + ' ';
  }
  return res;
}

export function getTagColor(s: any) {
  console.log('function getTagColor', s)
  return 'processing';
}

export function getTags(tags: string[]) {
  // let res = [];
  // if (!tags) return res;
  // tags.forEach((tag: any, i: any) => {
  //   res.push(
  //     <Tag color={getTagColor(tag: any)}>
  //       {tag}
  //     </Tag>
  //   );
  // });
  // return res;
  console.log('function getTags', tags)
  return ''
}

export function getApplicationOrgName(application: IApplication) {
  return `${application?.organizationObj.owner}/${application?.organizationObj.name}`;
}

export function getRandomName() {
  return Math.random().toString(36).slice(-6);
}

export function getRandomNumber() {
  return Math.random().toString(10).slice(-11);
}

export function getFromLink() {
  const from = sessionStorage.getItem('from');
  if (from === null) {
    return '/';
  }
  return from;
}

export function scrollToDiv(divId: string) {
  if (divId) {
    const ele = document.getElementById(divId);
    if (ele) {
      ele.scrollIntoView({behavior: 'smooth'});
    }
  }
}

export function getSyncerTableColumns(syncer: { type: any; }) {
  switch (syncer.type) {
    case 'Keycloak':
      return [
        {
          'name':'ID',
          'type':'string',
          'casdoorName':'Id',
          'isHashed':true,
          'values':[

          ]
        },
        {
          'name':'USERNAME',
          'type':'string',
          'casdoorName':'Name',
          'isHashed':true,
          'values':[

          ]
        },
        {
          'name':'USERNAME',
          'type':'string',
          'casdoorName':'DisplayName',
          'isHashed':true,
          'values':[

          ]
        },
        {
          'name':'EMAIL',
          'type':'string',
          'casdoorName':'Email',
          'isHashed':true,
          'values':[

          ]
        },
        {
          'name':'EMAIL_VERIFIED',
          'type':'boolean',
          'casdoorName':'EmailVerified',
          'isHashed':true,
          'values':[

          ]
        },
        {
          'name':'FIRST_NAME',
          'type':'string',
          'casdoorName':'FirstName',
          'isHashed':true,
          'values':[

          ]
        },
        {
          'name':'LAST_NAME',
          'type':'string',
          'casdoorName':'LastName',
          'isHashed':true,
          'values':[

          ]
        },
        {
          'name':'CREATED_TIMESTAMP',
          'type':'string',
          'casdoorName':'CreatedTime',
          'isHashed':true,
          'values':[

          ]
        },
        {
          'name':'ENABLED',
          'type':'boolean',
          'casdoorName':'IsForbidden',
          'isHashed':true,
          'values':[

          ]
        }
      ]
    default:
      return []
  }
}

export const ThirdPartLogo = {
  GitHub: {
    color: 'black',
    icon: 'mdi-github'
  },
  Google: {
    color: 'blue',
    icon:'mdi-google'
  },
  QQ: {
    color: 'black',
    icon: 'mdi-qqchat'
  },
  Wechat: {
    color: 'black',
    icon: 'mdi-wechat'
  },
};
