import React, { useState, ChangeEvent } from 'react';

const ArmInstructionEditor: React.FC = () => {
  const [condition, setCondition] = useState<string>('0000');
  const [opcode, setOpcode] = useState<string>('000000');
  const [s, setS] = useState<string>('0');
  const [Rn, setRn] = useState<string>('0000');
  const [Rd, setRd] = useState<string>('0000');
  const [shifter, setShifter] = useState<string>('000000');
  const [tipo, setTipo] = useState<string>('0000');
  const [R, setR] = useState<string>('0');
  const [Rm, setRm] = useState<string>('0000');

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, maxLength: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value.padStart(maxLength, '0').slice(-maxLength));
  };

  const getBinaryInstruction = (): string => {
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
              maxLength={4}
              value={condition}
              onChange={handleInputChange(setCondition, 4)}
            />
          </label>
        </div>
        <div>
          <label>
            Opcode (6 bits):
            <input
              type="text"
              maxLength={6}
              value={opcode}
              onChange={handleInputChange(setOpcode, 6)}
            />
          </label>
        </div>
        <div>
          <label>
            S (1 bit):
            <input
              type="text"
              maxLength={1}
              value={s}
              onChange={handleInputChange(setS, 1)}
            />
          </label>
        </div>
        <div>
          <label>
            Rn (4 bits):
            <input
              type="text"
              maxLength={4}
              value={Rn}
              onChange={handleInputChange(setRn, 4)}
            />
          </label>
        </div>
        <div>
          <label>
            Rd (4 bits):
            <input
              type="text"
              maxLength={4}
              value={Rd}
              onChange={handleInputChange(setRd, 4)}
            />
          </label>
        </div>
        <div>
          <label>
            Shifter (6 bits):
            <input
              type="text"
              maxLength={6}
              value={shifter}
              onChange={handleInputChange(setShifter, 6)}
            />
          </label>
        </div>
        <div>
          <label>
            Tipo (4 bits):
            <input
              type="text"
              maxLength={4}
              value={tipo}
              onChange={handleInputChange(setTipo, 4)}
            />
          </label>
        </div>
        <div>
          <label>
            R (1 bit):
            <input
              type="text"
              maxLength={1}
              value={R}
              onChange={handleInputChange(setR, 1)}
            />
          </label>
        </div>
        <div>
          <label>
            Rm (4 bits):
            <input
              type="text"
              maxLength={4}
              value={Rm}
              onChange={handleInputChange(setRm, 4)}
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
