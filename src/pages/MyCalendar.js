import { useAuth } from "../contexts/AuthContext";
import CalendarList from "../components/CalendarList";
import EventForm from "../components/EventForm";

export default function MyCalendar() {
  const { user } = useAuth();
  return (
    <section>
      <h2>내 일정</h2>
      <EventForm
        scope="PERSONAL"
        initial={{ userId: user?.id }}
        onSaved={() => {}}
      />
      <CalendarList filter={{ scope: "PERSONAL", userId: user?.id }} />
    </section>
  );
}
