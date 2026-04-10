export const setAccessToken = (token: string | null) => {
  if (typeof window === 'undefined') return;

  if (token) {
    window.localStorage.setItem('rna_access_token', token);
  } else {
    window.localStorage.removeItem('rna_access_token');
  }
};

export const setUser = (user: unknown | null) => {
  if (typeof window === 'undefined') return;

  if (user) {
    window.localStorage.setItem('rna_user', JSON.stringify(user));
  } else {
    window.localStorage.removeItem('rna_user');
  }
};
