import { IUser } from 'src/components/models/users';

export interface UserStateInterface {
    user: IUser
    isSignin: boolean
}

function state(): UserStateInterface {
  return {
    user: {
      uuid: '',
      username: '',
      email: '',
      display_name: '',
      status: '',
      role: '',
      email_verified: false,
      email_verified_at: new Date(),
      phone: '',
      phone_verified: false,
      phone_verified_at: new Date(),
      age: 0,
      avatar_url: '',
      gender: '',
      location: '',
      address: '',
      blog: '',
      bio: '',
      company: '',
      created_at: new Date(),
      updated_at: new Date(),
    },
    isSignin: false,
  }
};

export default state;
