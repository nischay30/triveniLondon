export type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
};

const userStore = new Map<string, User>();

export function createOrUpdateUser(user: User): User {
  userStore.set(user.id, user);
  return user;
}

export function findUserById(id: string): User | undefined {
  return userStore.get(id);
}
