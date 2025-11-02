import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import EventForm from './EventForm';

export default function CalendarList({ filter }) {
  const [events, setEvents] = useState([]);

  const load = async () => {
    const params = { _sort: 'start', _order: 'asc', ...filter };
    const { data } = await api.get('/events', { params });
    setEvents(data);
  };
  useEffect(()=>{ load(); }, [JSON.stringify(filter)]);

  return (
    <div className="cards">
      {events.map(ev => (
        <EventCard key={ev.id} ev={ev} onChanged={load} />
      ))}
      {events.length===0 && <p className="empty">표시할 일정이 없습니다.</p>}
    </div>
  );
}

function EventCard({ ev, onChanged }) {
  const { user } = useAuth();
  const del = async () => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    await api.delete(`/events/${ev.id}`); onChanged();
  };
  return (
    <article className="card">
      <h3>{ev.title}</h3>
      <p className="time">{dayjs(ev.start).format('YYYY.MM.DD')} ~ {dayjs(ev.end).format('YYYY.MM.DD')}</p>
      {ev.description && <p className="desc">{ev.description}</p>}
      {user && (
        <div className="actions">
          <EventForm mode="edit" initial={ev} onSaved={onChanged} />
          <button onClick={del}>삭제</button>
        </div>
      )}
    </article>
  );
}
