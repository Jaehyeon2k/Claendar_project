import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DeptBar from './components/DeptBar';
import Home from './pages/Home';
import DeptCalendar from './pages/DeptCalendar';
import MyCalendar from './pages/MyCalendar';
import Guard from './components/Guard';

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <DeptBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dept/:deptId" element={<DeptCalendar />} />
        <Route path="/me" element={<Guard><MyCalendar /></Guard>} />
      </Routes>
    </div>
  );
}
