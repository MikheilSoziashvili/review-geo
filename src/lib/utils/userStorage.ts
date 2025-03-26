export type StoredUser = {
    name: string;
    email: string;
    password: string;
  };
  
  const STORAGE_KEY = "registered-users";
  
  export function getStoredUsers(): StoredUser[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  
  export function saveUser(user: StoredUser): boolean {
    const users = getStoredUsers();
    const exists = users.some((u) => u.email === user.email);
    if (exists) return false;
  
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return true;
  }
  