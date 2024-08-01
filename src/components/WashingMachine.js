// src/components/WashingMachine.js

import React from 'react';
import img1 from './images/machine.png';

function WashingMachine({ machine, onCoinInsert, onCancel }) {
  const handleCoinInsert = () => {
    onCoinInsert(machine.id);
  };

  const handleCancel = () => {
    onCancel(machine.id);
  };

  return (
    <div className={`machine ${machine.inUse ? 'in-use' : 'available'}`}>
      <h2>เครื่องซักผ้าที่ {machine.id}</h2>
      <img src={img1} alt="" className="machine-image"/>
      <p>สถานะ: {machine.inUse ? `ใช้งานอยู่` : 'พร้อมใช้งาน'}</p>
      {!machine.inUse ? (
        <button className="insert-coin" onClick={handleCoinInsert}>หยอดเหรียญ</button>
      ) : (
        <button className="cancel" onClick={handleCancel}>ยกเลิก</button>
      )}
    </div>
  );
}

export default WashingMachine;
