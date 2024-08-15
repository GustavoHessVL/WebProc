import React, { useState } from 'react';

const ARMInstruction: React.FC = () => {
  // Estados para os campos de bits individuais
  const [condition, setCondition] = useState<number>(0);
  const [opcode, setOpcode] = useState<number>(0);
  const [s, setS] = useState<number>(0)
  const [Rn, setRn] = useState<number>(0);
  const [Rd, setRd] = useState<number>(0);
  const [shifter, setShifter] = useState<number>(0);
  const [tipo, setTipo] = useState<number>(0);
  const [R, setR] = useState<number>(0);
  const [Rm, setRm] = useState<number>(0);

  // Função para criar o binário da instrução
  const createBinaryInstruction = () => {
    return (
      (condition << 28) |
      (opcode << 21) |
      (Rn << 16) |
      (Rd << 12) |
      (shifter << 4) |
      (tipo << 1) |
      R |
      (Rm << 0)
    );
  };

  const instruction = createBinaryInstruction().toString(2).padStart(32, '0');

  return (
    <div>
      <h2>ARM Logical Arithmetic Instruction</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
        <label>
          Condição:
          <input
            type="number"
            value={condition}
            onChange={(e) => setCondition(Number(e.target.value) & 0xF)}
            min={0}
            max={15}
          />
        </label>
        <label>
          Opcode:
          <input
            type="number"
            value={opcode}
            onChange={(e) => setOpcode(Number(e.target.value) & 0xFF)}
            min={0}
            max={255}
          />
        </label>
        <label>
          Rn:
          <input
            type="number"
            value={Rn}
            onChange={(e) => setRn(Number(e.target.value) & 0xF)}
            min={0}
            max={15}
          />
        </label>
        <label>
          Rd:
          <input
            type="number"
            value={Rd}
            onChange={(e) => setRd(Number(e.target.value) & 0xF)}
            min={0}
            max={15}
          />
        </label>
        <label>
          Shifter:
          <input
            type="number"
            value={shifter}
            onChange={(e) => setShifter(Number(e.target.value) & 0xFF)}
            min={0}
            max={255}
          />
        </label>
        <label>
          Tipo:
          <input
            type="number"
            value={tipo}
            onChange={(e) => setTipo(Number(e.target.value) & 0x7)}
            min={0}
            max={7}
          />
        </label>
        <label>
          R:
          <input
            type="number"
            value={R}
            onChange={(e) => setR(Number(e.target.value) & 0x1)}
            min={0}
            max={1}
          />
        </label>
        <label>
          Rm:
          <input
            type="number"
            value={Rm}
            onChange={(e) => setRm(Number(e.target.value) & 0xF)}
            min={0}
            max={15}
          />
        </label>
      </div>

      <h3>Binary Instruction: {instruction}</h3>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Informações da Operação:</h4>
        <ul>
          <li>Condição: {condition.toString(2).padStart(4, '0')}</li>
          <li>Opcode: {opcode.toString(2).padStart(8, '0')}</li>
          <li>Rn: {Rn.toString(2).padStart(4, '0')}</li>
          <li>Rd: {Rd.toString(2).padStart(4, '0')}</li>
          <li>Shifter: {shifter.toString(2).padStart(8, '0')}</li>
          <li>Tipo: {tipo.toString(2).padStart(3, '0')}</li>
          <li>R: {R.toString(2).padStart(1, '0')}</li>
          <li>Rm: {Rm.toString(2).padStart(4, '0')}</li>
        </ul>
      </div>
    </div>
  );
};

export default ARMInstruction;
