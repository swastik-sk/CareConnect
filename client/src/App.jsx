import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Hospitals from './pages/Hospitals';
import HospitalDetails from './pages/HospitalDetails';
import HospitalDashboard from './pages/HospitalDashboard';
import Medicines from './pages/Medicines';
import PharmacyDashboard from './pages/PharmacyDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-navy text-slate-200 font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/hospitals/:id" element={<HospitalDetails />} />
            <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
