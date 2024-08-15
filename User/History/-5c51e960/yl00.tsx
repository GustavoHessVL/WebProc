import React, { useState } from 'react';

const ArmInstructionEditor = () => {
  const [condition, setCondition] = useState('0000');
  const [opcode, setOpcode] = useState('000000');
  const [s, setS] = useState('0');
  const [Rn, setRn] = useState('0000');
  const [Rd, setRd] = useState('0000');
  const [shifter, setShifter] = useState('000000');
  const [tipo, setTipo] = useState('0000');
  const [R, setR] = useState('0');
  const [Rm, setRm] = useState('0000');

  const getBinaryInstruction = () => {
    return `${condition}${opcode}${s}${Rn}${Rd}${shifter}${tipo}${R}${Rm}`;
  };

  return (
    <div>
      <h1>Editor de Instrução Lógico-Aritmética ARM</h1>
      <form>
        <div>
          <label>
            Condition (4 bits):
            <input
              type="text"
              maxLength="4"
              value={condition}
              onChange={(e) => setCondition(e.target.value.padStart(4, '0'))}
            />
          </label>
        </div>
        <div>
          <label>
            Opcode (6 bits):
            <input
              type="text"
              maxLength="6"
              value={opcode}
              onChange={(e) => setOpcode(e.target.value.padStart(6, '0'))}
            />
          </label>
        </div>
        <div>
          <label>
            S (1 bit):
            <input
              type="text"
              maxLength="1"
              value={s}
              onChange={(e) => setS(e.target.value.padStart(1, '0'))}
            />
          </label>
        </div>
        <div>
          <label>
            Rn (4 bits):
            <input
              type="text"
              maxLength="4"
              value={Rn}
              onChange={(e) => setRn(e.target.value.padStart(4, '0'))}
            />
          </label>
        </div>
        <div>
          <label>
            Rd (4 bits):
            <input
              type="text"
              maxLength="4"
              value={Rd}
              onChange={(e) => setRd(e.target.value.padStart(4, '0'))}
            />
          </label>
        </div>
        <div>
          <label>
            Shifter (6 bits):
            <input
              type="text"
              maxLength="6"
              value={shifter}
              onChange={(e) => setShifter(e.target.value.padStart(6, '0'))}
            />
          </label>
        </div>
        <div>
          <label>
            Tipo (4 bits):
            <input
              type="text"
              maxLength="4"
              value={tipo}
              onChange={(e) => setTipo(e.target.value.padStart(4, '0'))}
            />
          </label>
        </div>
        <div>
          <label>
            R (1 bit):
            <input
              type="text"
              maxLength="1"
              value={R}
              onChange={(e) => setR(e.target.value.padStart(1, '0'))}
            />
          </label>
        </div>
        <div>
          <label>
            Rm (4 bits):
            <input
              type="text"
              maxLength="4"
              value={Rm}
              onChange={(e) => setRm(e.target.value.padStart(4, '0'))}
            />
          </label>
        </div>
      </form>
      <h2>Instrução Binária:</h2>
      <pre>{getBinaryInstruction()}</pre>
    </div>
  );
};

export default ArmInstructionEditor;
