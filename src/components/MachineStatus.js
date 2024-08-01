// src/components/MachineStatus.js

import React from 'react';

function MachineStatus({ machines }) {
  return (
    <div className="machine-status">
      <h2>สถานะเครื่องซักผ้า</h2>
      {machines.map((machine) => (
        <div key={machine.id}>
          <p>เครื่องซักผ้าที่ {machine.id}: {machine.inUse ? `ใช้งานอยู่ เหลือเวลา (${machine.timeLeft} วินาที)` : 'พร้อมใช้งาน'}</p>
        </div>
      ))}
    </div>
  );
}

export default MachineStatus;
