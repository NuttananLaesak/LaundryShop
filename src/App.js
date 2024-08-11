import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import WashingMachine from './components/WashingMachine';
import MachineStatus from './components/MachineStatus';

const initialMachines = [
  { id: 1, inUse: false, timeLeft: 0, defaultTime: 70 },
  { id: 2, inUse: false, timeLeft: 0, defaultTime: 70 },
  { id: 3, inUse: false, timeLeft: 0, defaultTime: 70 },
  { id: 4, inUse: false, timeLeft: 0, defaultTime: 70 },
  { id: 5, inUse: false, timeLeft: 0, defaultTime: 70 },
  { id: 6, inUse: false, timeLeft: 0, defaultTime: 70 },
];

function App() {
  const [machines, setMachines] = useState(initialMachines);
  const [popup, setPopup] = useState(null);
  const [inputAmount, setInputAmount] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines((machines) =>
        machines.map((machine) => {
          if (machine.inUse && machine.timeLeft > 0) {
            const updatedMachine = { ...machine, timeLeft: machine.timeLeft - 1 };

            if (updatedMachine.timeLeft === 60 && !popup) {
              setPopup({ message: `เครื่องซักผ้าที่ ${updatedMachine.id} ใกล้จะซักผ้าเสร็จเเล้วนะครับ!`, machineId: null });
            }

            return updatedMachine;
          } else if (machine.inUse && machine.timeLeft === 0) {
            return { ...machine, inUse: false };
          } else {
            return machine;
          }
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [popup]);

  const handleCoinInsert = (machineId) => {
    setPopup({ message: `กรุณาใส่จำนวนเงิน (บาท) สำหรับเครื่องซักผ้าที่ ${machineId}`, machineId });
  };

  const handleConfirmInsert = () => {
    const amount = parseFloat(inputAmount);
    if (!isNaN(amount) && amount > 0) {
      setMachines(machines.map(machine => 
        machine.id === popup.machineId ? { ...machine, timeLeft: amount * 10, inUse: true } : machine
      ));
      setPopup(null);
      setInputAmount('');
    } else {
      alert('กรุณาใส่จำนวนเงินที่ถูกต้อง');
    }
  };

  const handleCancel = (machineId) => {
    setMachines(machines.map(machine =>
      machine.id === machineId ? { ...machine, inUse: false, timeLeft: 0 } : machine
    ));
  };

  const handleClosePopup = () => {
    setPopup(null);
    setInputAmount('');
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>ระบบเครื่องซักผ้าออนไลน์</h1>
          <ul className="nav-links">
            <li><Link to="/">หน้าเเรก</Link></li>
            <li><Link to="/machines">เครื่องซักผ้า</Link></li>
            <li><Link to="/status">สถานะ</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/machines" element={
            <div className="machines">
              {machines.map((machine) => (
                <WashingMachine 
                  key={machine.id} 
                  machine={machine} 
                  onCoinInsert={handleCoinInsert} 
                  onCancel={handleCancel}
                />
              ))}
            </div>
          } />
          <Route path="/status" element={<MachineStatus machines={machines} />} />
          <Route path="/" element={
            <div className="welcome">
              <div className="welcome-content">
                <h2>ยินดีต้อนรับ <br></br>ระบบเครื่องซักผ้าออนไลน์</h2>
                <p>สะดวกสบายในการ สั่งซักผ้า ตรวจเช็ค เเจ้งเตือน ผ่านทางออนไลน์นี้เท่านั้น!</p>
                <Link to="/machines" className="btn-primary">ดูเครื่องซักผ้าทั้งหมด</Link>
              </div>
            </div>
          } />
        </Routes>
        {popup && (
          <div className="popup-overlay">
            <div className="popup-content">
              {popup.machineId ? (
                <div>
                  <p>{popup.message}</p>
                  <input 
                    type="number" 
                    placeholder="ใส่จำนวนเงิน (บาท)" 
                    value={inputAmount} 
                    onChange={(e) => setInputAmount(e.target.value)} 
                  />
                  <button onClick={handleConfirmInsert}>ยืนยัน</button>
                  <button onClick={handleClosePopup}>ยกเลิก</button>
                </div>
              ) : (
                <div>
                  <p>{popup.message}</p>
                  <button onClick={handleClosePopup}>รับทราบ</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
