import { log } from "console";

type user = {
  socketId: string;
  groupIds: Set<string>;
};

export class SocketServer {
  private users: Map<string, user>;
  private groups: Map<string, Set<string>>;

  constructor() {
    this.users = new Map();
    this.groups = new Map();
  }

  listUsers(): void {
    this.users.forEach((vals, key) => {
      log("user id: ", key);
      vals.groupIds.forEach((val) => {
        log("group id: ", val);
      });
    });
  }

  listGroups(): void {
    this.groups.forEach((vals, key) => {
      log("group id: ", key);
      vals.forEach((val) => {
        log("user id:", val);
      });
    });
  }

  setUser(socketId: string, userId: string): boolean {
    if (this.users.has(userId)) {
      return false;
    }

    this.users.set(userId, {
      socketId: socketId,
      groupIds: new Set(),
    });

    return true;
  }

  getUser(userId: string): string | undefined {
    return this.users.get(userId)?.socketId;
  }

  getGroups(groupId: string): Set<string> | undefined {
    const groups = this.groups.get(groupId);
    return groups;
  }

  setGroup(groupId: string, userId: string): void {
    const isPresent = this.groups.has(groupId);

    if (!isPresent) {
      this.groups.set(groupId, new Set<string>());
    }

    this.groups.get(groupId)?.add(userId);
    this.users.get(userId)?.groupIds.add(groupId);
  }

  setGroups(groupIds: string[], userId: string): void {
    groupIds.forEach((val) => {
      this.setGroup(val, userId);
    });
  }

  removeUser(socketId: string): boolean {
    let userId: string | undefined;
    this.users.forEach((val, key) => {
      if (val.socketId === socketId) {
        userId = key;
      }
    });

    if (!userId) {
      return false;
    }

    this.users.get(userId)?.groupIds.forEach((val) => {
      if (userId) {
        this.groups.get(val)?.delete(userId);
      }
    });

    return this.users.delete(userId);
  }
}
