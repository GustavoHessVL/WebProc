import React from "react";

interface WriteContainerProps {
  memory: { [address: string]: any };
  selectedAddress: string;
  selectedProcessor: 1 | 2;
  onAddressChange: (address: string) => void;
  onProcessorChange: (processor: 1 | 2) => void;
}

const WriteContainer: React.FC<WriteContainerProps> = ({
  memory,
  selectedAddress,
  selectedProcessor,
  onAddressChange,
  onProcessorChange,
}) => {
  return (
    <div className="inputsContainer">
      <h3>Write to Cache</h3>
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
          Memory Address:
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
      <button>Write</button>
      <div>
        <label>
          Value to Write:
          <input type="text" placeholder="Enter value" />
        </label>
      </div>
    </div>
  );
};

export default WriteContainer;
