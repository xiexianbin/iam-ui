export interface IUser {
  uuid: string;
  username: string;
  email: string;
  display_name: string;

  status: string;
  role: string;

  email_verified: boolean;
  email_verified_at: Date;
  phone: string;
  phone_verified: boolean;
  phone_verified_at: Date;

  age: number;
  avatar_url: string;
  gender: string;
  location: string;
  address: string;
  blog: string;
  bio: string;
  company: string;

  created_at: Date;
  updated_at: Date;
}

export interface IUserSignin {
  email: string;
  password: string;
  accept: boolean
}
