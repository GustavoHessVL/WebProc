import React, { useState } from 'react';

type Registers = {
  [key: string]: string;
};

interface RegisterProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

const Register: React.FC<RegisterProps> = ({ name, value, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <label style={{ marginRight: '10px', width: '50px' }}>{name}:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        style={{ width: '100px', textAlign: 'right' }}
      />
    </div>
  );
};

const MovComponent: React.FC = () => {
  const [movInstruction, setMovInstruction] = useState<string>('MOV');

  const [registers, setRegisters] = useState<Registers>({
    R0: '0x00000000',
    R1: '0x00000000',
    R2: '0x00000000',
    R3: '0x00000000',
    R4: '0x00000000',
    R5: '0x00000000',
    R6: '0x00000000',
    R7: '0x00000000',
    R8: '0x00000000',
    R9: '0x00000000',
    R10: '0x00000000',
    R11: '0x00000000',
    R12: '0x00000000',
    R13: '0x00000000',
    R14: '0x00000000',
    R15: '0x00000000',  // PC
  });

  const handleRegisterChange = (name: string, value: string) => {
    let rawValue = value.startsWith('0x') ? value.slice(2) : value;

    rawValue = rawValue.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();

    if (rawValue.length > 8) {
      rawValue = rawValue.slice(-8);
    }

    const formattedValue = `0x${rawValue.padStart(8, '0')}`;

    setRegisters((prevRegisters) => ({
      ...prevRegisters,
      [name]: formattedValue,
    }));
  };

  const handleMOV = (dest: string, src: string) => {
    setRegisters((prevRegisters) => {
      const newRegisters = {
        ...prevRegisters,
        [dest]: prevRegisters[src],
      };

      return newRegisters;
    });
  };

  const updateMovInstruction = () => {
    const dest = (document.getElementById('destRegister') as HTMLSelectElement).value;
    const src = (document.getElementById('srcRegister') as HTMLSelectElement).value;
    setMovInstruction(`MOV ${dest}, ${src}`);
  };


  return (
    <div>
      <h2>Desvio Absoluto</h2>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        backgroundColor: '#f9f9f9f9',
        padding:'10px',
        color:'black',
        borderRadius: '5px',
        border: '1px solid #ccc',}}>
        {Object.keys(registers).map((reg) => (
          <div key={reg} style={{ flex: '1 1 50%', minWidth: '200px' }}>
            <Register
              name={reg}
              value={registers[reg]}
              onChange={handleRegisterChange}
            />
          </div>
        ))}
      </div>
      <p></p>
      <div style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '15px',
            color: 'black',
            backgroundColor: '#f9f9f9',
          }}>
      <label>Registrador de Origem: </label>
        <select id="srcRegister" onChange={updateMovInstruction}>
          {Object.keys(registers).map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>

        <label  style={{ marginLeft: '20px' }}>Registrador de Destino: </label>
        <select id="destRegister" onChange={updateMovInstruction}>
          {Object.keys(registers).map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>

        <button
          onClick={() =>
            handleMOV(
              (document.getElementById('destRegister') as HTMLSelectElement).value,
              (document.getElementById('srcRegister') as HTMLSelectElement).value
            )
          }
          style={{ marginLeft: '20px' }}
        >
          {movInstruction}
        </button>
      </div>
      <p></p>
      <div style={{
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '15px',
            color: 'black',
            backgroundColor: '#f9f9f9',
          }}>
        <h3>PC (Program Counter): {registers.R15}</h3>
      </div>
    </div>
  );
};

export default MovComponent;
