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
    <div style={{ marginBottom: '8px' }}>
      <label style={{ marginRight: '10px' }}>{name}:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        style={{ width: '100px' }}
      />
    </div>
  );
};

const ARMEmulator: React.FC = () => {
  const [registers, setRegisters] = useState<Registers>({
    r0: '0x00000000',
    r1: '0x00000000',
    r2: '0x00000000',
    r3: '0x00000000',
    r4: '0x00000000',
    r5: '0x00000000',
    r6: '0x00000000',
    r7: '0x00000000',
    r8: '0x00000000',
    r9: '0x00000000',
    r10: '0x00000000',
    r11: '0x00000000',
    r12: '0x00000000',
    r13: '0x00000000',
    r14: '0x00000000',
    r15: '0x00000000',
  });

  const handleRegisterChange = (name: string, value: string) => {
    // Remove '0x' do início se presente
    let rawValue = value.startsWith('0x') ? value.slice(2) : value;

    // Remover todos os caracteres que não sejam hexadecimais
    rawValue = rawValue.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();

    // Limita o valor a 32 bits (8 dígitos hexadecimais)
    if (rawValue.length > 8) {
      rawValue = rawValue.slice(-8);
    }

    // Formatar com '0x' e completar com zeros à esquerda
    const formattedValue = `0x${rawValue.padStart(8, '0')}`;

    setRegisters((prevRegisters) => ({
      ...prevRegisters,
      [name]: formattedValue,
    }));
  };

  const handleMOV = (dest: string, src: string) => {
    setRegisters((prevRegisters) => ({
      ...prevRegisters,
      [dest]: prevRegisters[src],
    }));
  };

  return (
    <div>
      <h2>ARM MOV Emulator</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '400px' }}>
        {Object.keys(registers).map((reg) => (
          <Register
            key={reg}
            name={reg}
            value={registers[reg]}
            onChange={handleRegisterChange}
          />
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>Destination Register: </label>
        <select id="destRegister">
          {Object.keys(registers).map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>

        <label style={{ marginLeft: '20px' }}>Source Register: </label>
        <select id="srcRegister">
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
          MOV
        </button>
      </div>
    </div>
  );
};

export default ARMEmulator;
