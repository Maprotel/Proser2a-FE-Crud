export class CurrentUserModel {
  id: string;
  ttl: number;
  created: string;
  userId: number;
  user: {
    id?: number;
    firstname?: string;
    lastname?: string;
    profile?: string;
    realm?: string;
    username?: string;
    password?: string;
    email?: string;
    user_legal_id?: string;
    user_internal_id?: string;
    user_photo_path?: string;
  };
}

export class CurrentConfigurarationModel {
  key: string;
  value: string;

  constructor() {
    this.key = "123";
  }
}

export class CurrentModulesModel {
  name: string;
  path: string;
  visible: string;
}
