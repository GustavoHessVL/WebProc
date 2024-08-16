import React, { useState } from "react";
import "./Style.css";

interface PageTableEntry {
  pageNumber: string;
  frameNumber: string;
  valid: boolean;
  protectionBits: string;
}

const MmuComponent: React.FC = () => {
  const [pageTable, setPageTable] = useState<PageTableEntry[]>([
    { pageNumber: "00", frameNumber: "10", valid: true, protectionBits: "RW" },
    { pageNumber: "01", frameNumber: "02", valid: true, protectionBits: "RW" },
  ]);

  const [logicalAddresses, setLogicalAddresses] = useState<string[]>([""]);
  const [physicalAddresses, setPhysicalAddresses] = useState<string[]>([]);

  const handleAddressTranslation = () => {
    const translatedAddresses = logicalAddresses.map((logicalAddress) => {
      const pageNumber = logicalAddress.substring(0, 2);
      const offset = logicalAddress.substring(2);

      const entry = pageTable.find((entry) => entry.pageNumber === pageNumber);

      if (entry && entry.valid) {
        return entry.frameNumber + offset;
      } else {
        return "Invalid address";
      }
    });

    setPhysicalAddresses(translatedAddresses);
  };

  const handleAddPageTableEntry = () => {
    setPageTable([
      ...pageTable,
      { pageNumber: "", frameNumber: "", valid: false, protectionBits: "" },
    ]);
  };

  const handleLogicalAddressChange = (index: number, value: string) => {
    const newAddresses = [...logicalAddresses];
    newAddresses[index] = value;
    setLogicalAddresses(newAddresses);
  };

  const handleAddLogicalAddress = () => {
    setLogicalAddresses([...logicalAddresses, ""]);
  };

  return (
    <div className="mmu-container">
      <h2 className="mmu-title">Advanced MMU Interactive Component</h2>
      <div className="address-inputs">
        {logicalAddresses.map((address, index) => (
          <div key={index} className="address-input">
            <label>Logical Address {index + 1}: </label>
            <input
              type="text"
              value={address}
              onChange={(e) =>
                handleLogicalAddressChange(index, e.target.value)
              }
              placeholder="Enter logical address"
            />
          </div>
        ))}
        <button onClick={handleAddLogicalAddress}>Add Logical Address</button>
      </div>
      <button onClick={handleAddressTranslation}>Translate All</button>
      <div className="page-table-container">
        <h3>Page Table</h3>
        <button onClick={handleAddPageTableEntry}>Add Page Table Entry</button>
        <table className="page-table">
          <thead>
            <tr>
              <th>Page Number</th>
              <th>Frame Number</th>
              <th>Valid</th>
              <th>Protection</th>
            </tr>
          </thead>
          <tbody>
            {pageTable.map((entry, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={entry.pageNumber}
                    onChange={(e) => {
                      const newTable = [...pageTable];
                      newTable[index].pageNumber = e.target.value;
                      setPageTable(newTable);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.frameNumber}
                    onChange={(e) => {
                      const newTable = [...pageTable];
                      newTable[index].frameNumber = e.target.value;
                      setPageTable(newTable);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={entry.valid}
                    onChange={(e) => {
                      const newTable = [...pageTable];
                      newTable[index].valid = e.target.checked;
                      setPageTable(newTable);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={entry.protectionBits}
                    onChange={(e) => {
                      const newTable = [...pageTable];
                      newTable[index].protectionBits = e.target.value;
                      setPageTable(newTable);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {physicalAddresses.length > 0 && (
        <div className="output-container">
          <h3>Physical Addresses:</h3>
          <ul>
            {physicalAddresses.map((address, index) => (
              <li key={index}>{`Logical Address ${index + 1}: ${
                logicalAddresses[index]
              } -> Physical Address: ${address}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MmuComponent;
