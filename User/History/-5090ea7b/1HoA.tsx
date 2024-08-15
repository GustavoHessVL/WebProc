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
    let formattedValue = value.startsWith('0x') ? value.slice(2) : parseInt(value).toString(16);

    // Limita o valor a 32 bits (8 dígitos hexadecimais)
    if (formattedValue.length > 8) {
      formattedValue = formattedValue.slice(-8);
    }

    // Formata o valor com o prefixo '0x' e preenche com zeros à esquerda se necessário
    formattedValue = `0x${formattedValue.padStart(8, '0').toUpperCase()}`;

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
