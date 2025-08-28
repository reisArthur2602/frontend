import { create } from "zustand";

interface IUser {
  id: string;
  email: string;
  name: string;
}
interface IUserState {
  currentUser: IUser | null;
}

interface IUserActions {
  updateUser: (user: IUser | null) => void;
}

export const UserStore = create<IUserState & IUserActions>((set) => ({
  currentUser: null,
  updateUser: (user) =>
    set({
      currentUser: user,
    }),
}));
