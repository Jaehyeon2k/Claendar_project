import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, signIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await signIn(form.email, form.password); setOpen(false); }
    catch (err) { alert(err.message); }
  };

  return (
    <header className="nav">
      <Link to="/" className="logo">📅 YJU 학사일정</Link>
      <nav className="nav-right">
        <Link to="/">전체 학사</Link>
        <Link to="/me">내 일정</Link>
        {user ? (
          <>
            <span className="user">{user.displayName}</span>
            <button onClick={signOut}>로그아웃</button>
          </>
        ) : (
          <button onClick={() => setOpen(v => !v)}>로그인</button>
        )}
      </nav>

      {open && (
        <form className="login-pop" onSubmit={onSubmit}>
          <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="이메일" />
          <input type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} placeholder="비밀번호" />
          <button type="submit">로그인</button>
        </form>
      )}
    </header>
  );
}
