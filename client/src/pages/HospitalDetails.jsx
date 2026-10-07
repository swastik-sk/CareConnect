import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, Phone, CalendarDays, Users } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { API_URL } from '../config';

const HospitalDetails = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Real-time updates simulation hook
  useEffect(() => {
    // This connects to the socket.io server
    const socket = io(`${API_URL}`);
    
    socket.on('connect', () => {
      console.log('Connected to real-time updates');
    });
    
    socket.on('queue_updated', (data) => {
      if (data.hospitalId === id) {
        console.log('Queue update received', data);
        // Here we would update the state with new queue info
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const dummyData = {
          _id: id, 
          name: id === '1' ? 'City Care Hospital' : id === '2' ? 'Green Valley Hospital' : 'Bangalore Medical Center',
          address: '123 Main St, Downtown', 
          phone: '+1 234 567 8900',
          openingHours: '24/7',
          departments: ['Cardiology', 'Neurology', 'Pediatrics'],
          doctors: [
            { id: 1, name: 'Dr. Sarah Smith', specialization: 'Cardiology', available: true },
            { id: 2, name: 'Dr. John Doe', specialization: 'Neurology', available: false },
          ],
          queues: [
            { department: 'Cardiology', waitingPatients: 5, estimatedWaitingTime: 25, currentToken: 42 },
            { department: 'Neurology', waitingPatients: 7, estimatedWaitingTime: 45, currentToken: 15 }
          ]
        };

        try {
          const res = await axios.get(`${API_URL}/api/hospitals/${id}`);
          if (res.data) {
            // For now, let's merge dummy doctors/queues if API doesn't return them since we haven't seeded full relational data
            setHospital({
              ...dummyData,
              ...res.data,
              queues: res.data.queues?.length > 0 ? res.data.queues : dummyData.queues
            });
          } else {
            setHospital(dummyData);
          }
        } catch (err) {
          setHospital(dummyData);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchHospital();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading hospital details...</div>;
  if (!hospital) return <div className="text-center py-20">Hospital not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 py-8">
      {/* Hospital Header */}
      <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden mb-8">
        <div className="bg-primary h-32"></div>
        <div className="px-6 pb-6 relative">
          <div className="absolute -top-16 bg-white p-2 rounded-lg shadow-lg border border-slate-100">
            <div className="w-24 h-24 bg-sky-100 text-primary flex items-center justify-center text-4xl font-bold rounded">
              {hospital.name.charAt(0)}
            </div>
          </div>
          
          <div className="pt-12 flex justify-between items-start flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold text-dark">{hospital.name}</h2>
              <div className="flex flex-col gap-2 mt-2 text-slate-600">
                <span className="flex items-center gap-2"><MapPin size={16}/> {hospital.address}</span>
                <span className="flex items-center gap-2"><Phone size={16}/> {hospital.phone}</span>
                <span className="flex items-center gap-2"><Clock size={16}/> Open: {hospital.openingHours}</span>
              </div>
            </div>
            
            <button className="bg-primary hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-semibold shadow transition">
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Queue Information */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold text-dark mb-4">Live Department Queues</h3>
          
          {hospital.queues && hospital.queues.map((queue, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                LIVE
              </div>
              
              <h4 className="text-xl font-bold mb-4">{queue.department}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                  <p className="text-slate-500 text-sm font-semibold mb-1">Current Token</p>
                  <p className="text-3xl font-bold text-primary">#{queue.currentToken}</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                  <p className="text-slate-500 text-sm font-semibold mb-1">Waiting</p>
                  <p className="text-3xl font-bold text-dark flex items-center justify-center gap-2">
                    <Users size={24} className="text-slate-400"/> {queue.waitingPatients}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border text-center ${queue.estimatedWaitingTime > 60 ? 'bg-red-50 border-red-100' : queue.estimatedWaitingTime > 30 ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-100'}`}>
                  <p className="text-slate-500 text-sm font-semibold mb-1">Est. Wait Time</p>
                  <p className={`text-3xl font-bold ${queue.estimatedWaitingTime > 60 ? 'text-danger' : queue.estimatedWaitingTime > 30 ? 'text-warning' : 'text-secondary'}`}>
                    {queue.estimatedWaitingTime}m
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400">Last updated: Just now</span>
                <button className="text-primary font-semibold text-sm hover:underline">Get Token in this Queue</button>
              </div>
            </div>
          ))}
        </div>

        {/* Doctors List */}
        <div>
          <h3 className="text-2xl font-bold text-dark mb-4">Available Doctors</h3>
          <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
            {hospital.doctors && hospital.doctors.map(doc => (
              <div key={doc.id} className="p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-dark">{doc.name}</h4>
                  <p className="text-sm text-slate-500">{doc.specialization}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${doc.available ? 'bg-secondary' : 'bg-slate-300'}`} title={doc.available ? 'Available' : 'Unavailable'}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
