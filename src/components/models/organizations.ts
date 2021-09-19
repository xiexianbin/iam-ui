export interface IOrganization {
  uuid: string;
  owner: string;
  name: string;
  display_name: string;

  site_url: string;
  default_avatar_url: string;

  created_at: Date;
  updated_at: Date;
}
