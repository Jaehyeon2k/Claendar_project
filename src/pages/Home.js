import CalendarList from '../components/CalendarList';
import EventForm from '../components/EventForm';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <section>
      <h2>학교 전체 학사일정</h2>
      {user && <EventForm scope="SCHOOL" onSaved={()=>{}} />}
      <CalendarList filter={{ scope: 'SCHOOL' }} />
    </section>
  );
}
