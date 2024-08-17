import React from "react";

interface ReadContainerProps {
  memory: { [address: string]: any };
  selectedAddress: string;
  selectedProcessor: 1 | 2;
  onAddressChange: (address: string) => void;
  onProcessorChange: (processor: 1 | 2) => void;
  onInputChange: (value: string) => void;
  onWrite: () => void;
  onRead: () => void;
}

const ReadContainer: React.FC<ReadContainerProps> = ({
  memory,
  selectedAddress,
  selectedProcessor,
  onAddressChange,
  onProcessorChange,
  onInputChange,
  onRead,
  onWrite
}) => {
  return (
    <div className="inputsContainer">
    <h3>Read from Cache</h3>
    <div>
      <label>
        Processor:
        <select 
          value={selectedProcessor}
          onChange={(e) => onProcessorChange(e.target.value === "1" ? 1 : 2)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </label>
    </div>
    <div>
    <label>
          Select Memory Address:
          <select
            value={selectedAddress}
            onChange={(e) => onAddressChange(e.target.value)}
          >
            {Object.keys(memory).map((address) => (
              <option key={address} value={address}>
                {address}
              </option>
            ))}
          </select>
        </label>
    </div>
    <div>
      <div>
          <label>
            Value to Write:
            <input 
              type="text" 
              placeholder="Enter value" 
              onChange={(e) => {
                console.log(memory[selectedAddress])
                onInputChange(String(e.target.value))
              }
              } 
              />
          </label>
        </div>
    </div>
    <button onClick={onWrite}>Write</button>
    <button onClick={onRead}>Read</button>
  </div>
  );
};

export default ReadContainer;