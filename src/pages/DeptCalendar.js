import { useParams } from "react-router-dom";
import CalendarList from "../components/CalendarList";
import EventForm from "../components/EventForm";

export default function DeptCalendar() {
  const { deptId } = useParams();
  return (
    <section>
      <h2>학과 일정</h2>
      <EventForm scope="DEPT" deptId={Number(deptId)} onSaved={() => {}} />
      <CalendarList filter={{ scope: "DEPT", deptId: Number(deptId) }} />
    </section>
  );
}
