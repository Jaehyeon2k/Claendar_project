import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('yju_user')) || null);

  const signIn = async (email, password) => {
    const { data } = await api.get('/users', { params: { email, password } });
    const u = data?.[0];
    if (!u) throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    setUser(u);
    localStorage.setItem('yju_user', JSON.stringify(u));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('yju_user');
  };

  return <Ctx.Provider value={{ user, signIn, signOut }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
