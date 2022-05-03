export interface IOrganization {
  owner: string;
  name: string;
  createdTime: Date;

  displayName: string;
  websiteUrl: string;
  favicon: string;
  passwordType: string;
  passwordSalt: string;
  phonePrefix: string;
  defaultAvatar: string;
  tags: string[];
  masterPassword: string;
  enableSoftDeletion: boolean;
  isProfilePublic: boolean;
}
