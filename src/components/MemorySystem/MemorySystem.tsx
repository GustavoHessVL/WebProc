import React, { useState } from "react";
import "./Styles.css";

const MemorySystem: React.FC = () => {
  const [memory, setMemory] = useState<number[]>(Array(10).fill(0));
  const [address, setAddress] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [operation, setOperation] = useState<string>("load");
  const [output, setOutput] = useState<string | number | null>(null);

  const handleOperation = () => {
    const memCopy = [...memory];
    if (operation === "load") {
      setOutput(memCopy[address]);
    } else if (operation === "store") {
      memCopy[address] = value;
      setMemory(memCopy);
      setOutput(`Stored ${value} at address ${address}`);
    }
  };

  return (
    <div className="memory-system">
      <h1>Simple Memory System</h1>
      <div className="input-group">
        <label>
          Address (0-9):
          <input
            type="number"
            value={address}
            onChange={(e) => setAddress(Number(e.target.value))}
            min="0"
            max="9"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Value:
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Operation:
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="load">Load</option>
            <option value="store">Store</option>
          </select>
        </label>
      </div>
      <button onClick={handleOperation}>Execute</button>
      {output !== null && <div className="output">Output: {output}</div>}
      <div className="memory-display">
        <h2>Memory</h2>
        <div className="memory-slots">
          {memory.map((memValue, index) => (
            <div key={index} className="memory-slot">
              {memValue}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemorySystem;
