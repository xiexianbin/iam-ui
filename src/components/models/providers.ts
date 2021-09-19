export interface IProvider {
  uuid: string;
  owner: string;
  name: string;
  display_name: string;

  application: string;
  type: string;
  client_id: string;
  client_secret: string;

  logo_url: string

  description: string;
  redirect_uris: string;

  created_at: Date;
  updated_at: Date;
}
