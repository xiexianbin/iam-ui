export interface IApplication {
  uuid: string;
  owner: string;
  name: string;
  display_name: string;

  organization: string;

  logo_url: string
  default_avatar_url: string;
  website_url: string;

  description: string;
  enable_password: boolean;
  password_type: string;
  password_salt: string;
  enable_signup: boolean;
  enable_signin: boolean;

  client_id: string;
  client_secret: string;
  redirect_uris: string;


  created_at: Date;
  updated_at: Date;
}
