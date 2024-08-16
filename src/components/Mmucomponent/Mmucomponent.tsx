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
    // Adicione mais entradas conforme necessário
  ]);

  const [logicalAddress, setLogicalAddress] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");

  const handleAddressTranslation = () => {
    const pageNumber = logicalAddress.substring(0, 2);
    const offset = logicalAddress.substring(2);

    const entry = pageTable.find((entry) => entry.pageNumber === pageNumber);

    if (entry && entry.valid) {
      setPhysicalAddress(entry.frameNumber + offset);
    } else {
      setPhysicalAddress("Invalid address");
    }
  };

  return (
    <div className="mmu-container">
      <h2 className="mmu-title">MMU Interactive Component</h2>
      <div className="address-input">
        <label>Logical Address: </label>
        <input
          type="text"
          value={logicalAddress}
          onChange={(e) => setLogicalAddress(e.target.value)}
          placeholder="Enter logical address"
        />
        <button onClick={handleAddressTranslation}>Translate</button>
      </div>
      <div className="page-table-container">
        <h3>Page Table</h3>
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
                <td>{entry.pageNumber}</td>
                <td>{entry.frameNumber}</td>
                <td>{entry.valid ? "Yes" : "No"}</td>
                <td>{entry.protectionBits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {physicalAddress && (
        <div className="output-container">
          <h3>
            Physical Address: <span>{physicalAddress}</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default MmuComponent;
