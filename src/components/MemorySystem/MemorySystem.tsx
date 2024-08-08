import React, { useState, useEffect } from "react";
import "./Styles.css";

const MemorySystem: React.FC = () => {
  const [memory, setMemory] = useState<number[]>(Array(10).fill(0));
  const [address, setAddress] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [operation, setOperation] = useState<string>("load");
  const [output, setOutput] = useState<string | number | null>(null);

  useEffect(() => {
    setOutput(null);
  }, [operation]);

  const handleOperation = () => {
    const memCopy = [...memory];
    const addressIndex = address / 4;
    if (operation === "load") {
      setOutput(memCopy[addressIndex]);
    } else if (operation === "store") {
      memCopy[addressIndex] = value;
      setMemory(memCopy);
      setOutput(
        `Stored ${value} at address 0x${address
          .toString(16)
          .padStart(2, "0")
          .toUpperCase()}`
      );
    }
  };

  return (
    <div className="memory-system">
      <h1>Simple Memory System</h1>
      <div className="input-group">
        <label>
          Address:
          <select
            value={address}
            onChange={(e) => setAddress(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i * 4).map((addr) => (
              <option key={addr} value={addr}>
                {`0x${addr.toString(16).padStart(2, "0").toUpperCase()}`}
              </option>
            ))}
          </select>
        </label>
      </div>
      {operation === "store" && (
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
      )}
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
              <div className="memory-value">{memValue}</div>
              <div className="memory-hex">{`0x${(index * 4)
                .toString(16)
                .padStart(2, "0")
                .toUpperCase()}`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemorySystem;
