import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';

export default function DeptBar() {
  const [depts, setDepts] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    api.get('/departments?_sort=dept_name').then(res => setDepts(res.data));
  }, []);

  return (
    <div className="deptbar">
      <span className="dept-title">학과</span>
      <Link to="/" className={pathname==='/'?'on':''}>전체</Link>
      {depts.map(d => (
        <Link key={d.id} to={`/dept/${d.id}`} className={pathname===`/dept/${d.id}`?'on':''}>
          {d.dept_name}
        </Link>
      ))}
    </div>
  );
}
