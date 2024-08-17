import React, { useState } from "react";
import "./Style.css";

interface PageTableEntry {
  frame: number;
  valid: boolean;
  originalFrame: number | null; 
}

interface MemoryProps {
  pageNumber: number;
  offset: number;
}

const unitSize = 4; 
const initialMemorySize = 3; 
const maxPagesAndFrames = 6;

const MmuComponent: React.FC = () => {
  const [pageTable, setPageTable] = useState<PageTableEntry[]>([
    { frame: 1, valid: true, originalFrame: 1 },
    { frame: 2, valid: true, originalFrame: 2 },
    { frame: 0, valid: true, originalFrame: 0 },
  ]);

  const [input, setInput] = useState<MemoryProps>({ pageNumber: 0, offset: 0 });
  const [physicalAddress, setPhysicalAddress] = useState<string | null>(null);
  const [frameNumber, setFrameNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [newFrameNumber, setNewFrameNumber] = useState<number>(0);
  const [physicalMemorySize, setPhysicalMemorySize] =
    useState<number>(initialMemorySize);

  const handlePageNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, pageNumber: parseInt(e.target.value, 10) });
  };

  const handleOffsetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, offset: parseInt(e.target.value, 10) });
  };

  const handleNewFrameNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewFrameNumber(parseInt(e.target.value, 10));
  };

  const calculatePhysicalAddress = () => {
    const { pageNumber, offset } = input;

    if (pageNumber < 0 || pageNumber >= pageTable.length) {
      setError("Número de página inválido");
      setPhysicalAddress(null);
      setFrameNumber(null);
      return;
    }

    const entry = pageTable[pageNumber];
    if (entry.valid) {
      const address = entry.frame * 1024 + offset * unitSize; 
      setPhysicalAddress(address.toString(16).toUpperCase()); 
      setFrameNumber(entry.frame);
      setError(null);
    } else {
      setError("Página inválida na tabela de páginas");
      setPhysicalAddress(null);
      setFrameNumber(null);
    }
  };

  const addNewPage = () => {
    if (pageTable.length >= maxPagesAndFrames) {
      setError("Número máximo de páginas atingido");
      return;
    }

    if (newFrameNumber < 0 || newFrameNumber >= physicalMemorySize) {
      setError("Quadro de memória inválido");
      return;
    }

    const updatedPageTable = [
      ...pageTable,
      { frame: newFrameNumber, valid: true, originalFrame: newFrameNumber },
    ];
    setPageTable(updatedPageTable);
    setError(null);
  };

  const addPhysicalFrame = () => {
    if (physicalMemorySize >= maxPagesAndFrames) {
      setError("Número máximo de quadros atingido");
      return;
    }
    setPhysicalMemorySize(physicalMemorySize + 1);
    setError(null);
  };

  const togglePageValidity = (index: number) => {
    setPageTable((prevPageTable) =>
      prevPageTable.map((page, i) => {
        if (i === index) {
          return page.valid
            ? { ...page, valid: false } 
            : { ...page, valid: true, frame: page.originalFrame! }; 
        }
        return page;
      })
    );
  };

  const renderMemoryVisualization = () => {
    const renderBlocks = (blocks: React.ReactNode[]) => {
      return blocks
        .reduce<React.ReactNode[][]>((rows, block, index) => {
          if (index % 3 === 0) rows.push([]);
          rows[rows.length - 1].push(block);
          return rows;
        }, [])
        .map((row, index) => (
          <div key={index} className="memory-row">
            {row}
          </div>
        ));
    };

    return (
      <div className="memory-visualization">
        <div className="virtual-memory">
          <h3>Memória Virtual</h3>
          {renderBlocks(
            pageTable.map((entry, index) => (
              <div
                key={index}
                className={`memory-block ${entry.valid ? "" : "invalid"}`}
                onClick={() => togglePageValidity(index)}
              >
                <span>Página {index}</span>
              </div>
            ))
          )}
        </div>
        <div className="physical-memory">
          <h3>Memória Física</h3>
          {renderBlocks(
            Array.from({ length: physicalMemorySize }).map((_, index) => (
              <div key={index} className="memory-block">
                <span>Quadro {index}</span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mmu-container">
      <h2>Simulação de MMU</h2>
      <div className="inputs-container">
        <div className="input-group">
          <h4>Pesquisar Página</h4>
          <label>
            Número da Página:
            <input
              type="number"
              value={input.pageNumber}
              onChange={handlePageNumberChange}
            />
          </label>
          <label>
            Deslocamento (Offset):
            <input
              type="number"
              value={input.offset}
              onChange={handleOffsetChange}
            />
          </label>
          <button onClick={calculatePhysicalAddress}>
            Calcular Endereço Físico
          </button>
          {physicalAddress !== null && frameNumber !== null && (
            <div className="result">
              <h3>Endereço Físico: 0x{physicalAddress}</h3>
              <h3>Quadro: {frameNumber}</h3>
            </div>
          )}
        </div>
        <div className="input-group">
          <h4>Adicionar Página</h4>
          <label>Escolha o Quadro de Memória:</label>
          <input
            type="number"
            value={newFrameNumber}
            onChange={handleNewFrameNumberChange}
          />
          <button onClick={addNewPage}>Adicionar Nova Página</button>
        </div>
        <div className="input-group">
          <h4>Adicionar Quadro</h4>
          <button onClick={addPhysicalFrame}>Adicionar Quadro Físico</button>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {renderMemoryVisualization()}
    </div>
  );
};

export default MmuComponent;
