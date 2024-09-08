"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Clock, Pill, CheckCircle, XCircle, AlertTriangle, 
  PlusCircle, Edit, Trash2, Info, ChevronDown, ChevronUp,
  Calendar, TrendingUp, Settings, Search
} from 'lucide-react';
import Image from 'next/image';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import "../../sass/reminders.scss";

const defaultMedications = [
  { id: 1, name: "Aspirin", dosage: "81mg", frequency: "Once daily", time: "08:00", lastTaken: null, adherence: 95, notes: "Take with food" },
  { id: 2, name: "Lisinopril", dosage: "10mg", frequency: "Twice daily", time: "08:00,20:00", lastTaken: null, adherence: 88, notes: "Monitor blood pressure" },
  { id: 3, name: "Metformin", dosage: "500mg", frequency: "With meals", time: "08:00,13:00,18:00", lastTaken: null, adherence: 92, notes: "Take with meals to reduce side effects" },
];

const adherenceData = [
  { name: 'Mon', adherence: 100 },
  { name: 'Tue', adherence: 80 },
  { name: 'Wed', adherence: 100 },
  { name: 'Thu', adherence: 60 },
  { name: 'Fri', adherence: 90 },
  { name: 'Sat', adherence: 100 },
  { name: 'Sun', adherence: 70 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function RemindersPage() {
  const [medications, setMedications] = useState(defaultMedications);
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', time: '', notes: '' });
  const [editingMedication, setEditingMedication] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [expandedMedication, setExpandedMedication] = useState(null);
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 60000);

    return () => clearInterval(interval);
  }, [medications]);

  const checkReminders = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    medications.forEach(med => {
      const times = med.time.split(',');
      if (times.includes(currentTime)) {
        setCurrentReminder(med);
        setShowReminderModal(true);
      }
    });
  };

  const handleAddMedication = (e) => {
    e.preventDefault();
    setMedications([...medications, { ...newMedication, id: medications.length + 1, lastTaken: null, adherence: 100 }]);
    setNewMedication({ name: '', dosage: '', frequency: '', time: '', notes: '' });
    setShowAddForm(false);
  };

  const handleEditMedication = (medication) => {
    setEditingMedication(medication);
    setNewMedication(medication);
    setShowAddForm(true);
  };

  const handleUpdateMedication = (e) => {
    e.preventDefault();
    setMedications(medications.map(med => med.id === editingMedication.id ? newMedication : med));
    setNewMedication({ name: '', dosage: '', frequency: '', time: '', notes: '' });
    setEditingMedication(null);
    setShowAddForm(false);
  };

  const handleDeleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const handleTakeMedication = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, lastTaken: new Date().toISOString() } : med
    ));
    setShowReminderModal(false);
  };

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.dosage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const MedicationCard = ({ medication }) => (
    <motion.div 
      className="medication-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="medication-header">
        <h3>{medication.name}</h3>
        <div className="medication-actions">
          <Button variant="ghost" size="icon" onClick={() => handleEditMedication(medication)}><Edit size={16} /></Button>
          <Button variant="ghost" size="icon" onClick={() => handleDeleteMedication(medication.id)}><Trash2 size={16} /></Button>
          <Button variant="ghost" size="icon" onClick={() => setExpandedMedication(expandedMedication === medication.id ? null : medication.id)}>
            {expandedMedication === medication.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
      </div>
      <p><Pill size={16} /> Dosage: {medication.dosage}</p>
      <p><Clock size={16} /> Frequency: {medication.frequency}</p>
      <p><Bell size={16} /> Reminder Times: {medication.time}</p>
      {medication.lastTaken && (
        <p><CheckCircle size={16} /> Last Taken: {new Date(medication.lastTaken).toLocaleString()}</p>
      )}
      <AnimatePresence>
        {expandedMedication === medication.id && (
          <motion.div 
            className="medication-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4>Adherence Rate</h4>
            <div className="adherence-chart">
              <ResponsiveContainer width="100%" height={100}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Adherence', value: medication.adherence },
                      { name: 'Non-adherence', value: 100 - medication.adherence }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={40}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[0, 1].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <p>{medication.adherence}% Adherence</p>
            </div>
            <h4>Notes</h4>
            <p>{medication.notes}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const CalendarView = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const calendarDays = Array(firstDayOfMonth).fill(null).concat(days);
  
    return (
      <div className="calendar-view">
        <div className="calendar-header">
          <Button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
            Previous
          </Button>
          <h2>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <Button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
            Next
          </Button>
        </div>
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <div key={index} className={`calendar-day ${day === null ? 'empty' : ''}`}>
              {day}
              {day && medications.some(med => {
                const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                return med.time.split(',').some(time => {
                  const [hours, minutes] = time.split(':');
                  const medicationDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(hours), parseInt(minutes));
                  return medicationDate > new Date();
                });
              }) && <div className="medication-dot"></div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const StatsView = () => (
    <div className="stats-view">
      <h2>Medication Adherence Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={adherenceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="adherence" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="medication-stats">
        {medications.map(med => (
          <div key={med.id} className="medication-stat-item">
            <h3>{med.name}</h3>
            <p>Adherence: {med.adherence}%</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="reminders-page">
      <header className="page-header">
        <h1>Medication Reminders 💊</h1>
        <nav>
          <Button variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}>List</Button>
          <Button variant={view === 'calendar' ? 'default' : 'outline'} onClick={() => setView('calendar')}>Calendar</Button>
          <Button variant={view === 'stats' ? 'default' : 'outline'} onClick={() => setView('stats')}>Stats</Button>
        </nav>
      </header>

      <main>
        {view === 'list' && (
          <>
            <div className="search-bar">
              <Input
                type="text"
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <AnimatePresence>
              <motion.div 
                className="medications-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredMedications.map((medication) => (
                  <MedicationCard key={medication.id} medication={medication} />
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {view === 'calendar' && <CalendarView />}
        {view === 'stats' && <StatsView />}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="add-medication-button">
              <PlusCircle size={20} /> Add New Medication
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingMedication ? 'Edit Medication' : 'Add New Medication'}</DialogTitle>
              <DialogDescription>
                Enter the details of your medication below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={editingMedication ? handleUpdateMedication : handleAddMedication}>
              <Input 
                type="text" 
                placeholder="Medication Name"
                value={newMedication.name}
                onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                required
              />
              <Input 
                type="text" 
                placeholder="Dosage"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                required
              />
              <Select 
                value={newMedication.frequency}
                onValueChange={(value) => setNewMedication({...newMedication, frequency: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Once daily">Once daily</SelectItem>
                  <SelectItem value="Twice daily">Twice daily</SelectItem>
                  <SelectItem value="Three times daily">Three times daily</SelectItem>
                  <SelectItem value="As needed">As needed</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                type="text" 
                placeholder="Reminder Times (comma-separated)"
                value={newMedication.time}
                onChange={(e) => setNewMedication({...newMedication, time: e.target.value})}
                required
              />
              <Input 
                type="text" 
                placeholder="Notes (optional)"
                value={newMedication.notes}
                onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
              />
              <Button type="submit">
                {editingMedication ? 'Update Medication' : 'Add Medication'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showReminderModal} onOpenChange={setShowReminderModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Medication Reminder</DialogTitle>
              <DialogDescription>
                It is time to take your medication!
              </DialogDescription>
            </DialogHeader>
            {currentReminder && (
              <div className="reminder-details">
                <h3>{currentReminder.name}</h3>
                <p>Dosage: {currentReminder.dosage}</p>
                <p>Notes: {currentReminder.notes}</p>
              </div>
            )}
            <div className="reminder-actions">
              <Button onClick={() => handleTakeMedication(currentReminder.id)}>
                Mark as Taken
              </Button>
              <Button variant="outline" onClick={() => setShowReminderModal(false)}>
                Dismiss
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <footer className="page-footer">
        <p>&copy; 2024 MedReminder. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default RemindersPage;