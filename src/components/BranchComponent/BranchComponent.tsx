import React, { useState,useEffect } from 'react';

const BranchComponent = () => {

    const [pc, setPc] = useState(0x100); 
    const [offset, setOffset] = useState(0x0); 

    const calculateOffset = (offset: Number) => {
        if (offset.valueOf() > 0x7FFFFF) {

            return offset.valueOf() - 0x1000000;
        }
        return offset.valueOf();
    };

    const handleBranch = () => {
        const signedOffset = calculateOffset(offset);
        const newPc = pc + signedOffset;
        if (newPc < 0) {
            alert("Desvio inválido: O PC não pode ser negativo.");
            return;
        }
        setPc(newPc);
    };

    const toHex = (num: Number) => '0x' + num.toString(16).toUpperCase();

    const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hexValue = e.target.value;
        setOffset(parseInt(hexValue, 16) || 0);
    };

    const toBinaryOffset = (num: Number) => num.toString(2).padStart(24, '0');

    return (
        <div style={{ fontFamily: 'Arial', maxWidth: '600px', margin: '20px auto' }}>
            <h2>Salto Relativo ao PC</h2>
            <p style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '15px',
            color: 'black',
            backgroundColor: '#f9f9f9',
          }}>
                <strong>PC (Program Counter):</strong> {toHex(pc)}
            </p>
            <label>
                <strong>Offset de Branch (Hexadecimal, até 24 bits):</strong> 
                <input 
                    type="text" 
                    value={toHex(offset)} 
                    onChange={handleHexInput} 
                    style={{ marginLeft: '10px' }}
                    maxLength={8} 
                />
            </label>
            <button 
                onClick={handleBranch} 
                style={{ display: 'inline', padding: '10px 20px' }}>
                Executar Desvio
            </button>
            <p style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '15px',
            color: 'black',
            backgroundColor: '#f9f9f9',
          }}>
                <strong>Instrução de Branch:</strong> <br />
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"condição"}</span>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"101L"}</span>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{toBinaryOffset(offset)}</span>
            </p>
            <p style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '15px',
            color: 'black',
            backgroundColor: '#f9f9f9',
          }}>
                <em>Após o branch, o PC será atualizado para: <strong>{toHex(pc + calculateOffset(offset))}</strong></em>
            </p>
        </div>
    );
};

export default BranchComponent;