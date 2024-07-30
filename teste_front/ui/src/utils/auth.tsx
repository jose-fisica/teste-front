export const getToken = (): string | null => {
  return localStorage.getItem('token')
};

export const getUser = (): string | null => {
  return localStorage.getItem('user')
}

export const isAuthenticated = (): boolean => {
  return !!getToken()
};

export const isLoginPage = (path: string): boolean => {
  return path === '/login' || path === '/';
}

export function clearToken(): void {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
};
