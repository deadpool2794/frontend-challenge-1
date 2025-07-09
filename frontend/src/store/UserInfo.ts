import { makeAutoObservable } from "mobx";

export interface User {
  name: string;
  email: string;
}

class UserInfo {
  user: User | null = { name: "alim", email: "alim@ehs.com" };
  constructor() {
    makeAutoObservable(this);
  }

  setUserInfo(user: User) {
    this.user = user;
  }

  clearUserInfo() {
    this.user = null;
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }
}

const userStore = new UserInfo();
export default userStore;
