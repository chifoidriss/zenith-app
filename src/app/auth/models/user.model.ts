
export class User {
  id?: string;
  name: string;
  first_name: string;
  last_name: string;
  title?: string;
  email: string;
  phone?: string;
  email_verified_at?: string;
  birthday?: string;
  country?: string;
  show_profile?: boolean;
  avatar: string = 'assets/img/avatar.svg';
  username?: string;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
