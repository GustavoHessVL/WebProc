import React, { useState,useEffect } from 'react';

const BranchComponent = () => {
    // Endereço inicial do PC
    const [pc, setPc] = useState(0x100); // Valor inicial arbitrário do PC em hexadecimal
    const [offset, setOffset] = useState(0x0); // Offset de desvio em hexadecimal

    // Função para simular a instrução de branch
    const handleBranch = () => {
        // O novo valor do PC é calculado com base no PC atual e no offset
        const newPc = pc + offset;
        setPc(newPc);
    };

    // Função para converter um número para string hexadecimal, com prefixo '0x'
    const toHex = (num: Number) => '0x' + num.toString(16).toUpperCase();

    // Função para converter um valor de string hexadecimal para decimal
    const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hexValue = e.target.value;
        setOffset(parseInt(hexValue, 16) || 0);
    };

    const toBinaryOffset = (num: Number) => num.toString(2).padStart(24, '0');

    return (
        <div style={{ fontFamily: 'Arial', maxWidth: '600px', margin: '20px auto' }}>
            <h2>Simulação de Instrução de Branch (ARM)</h2>
            <p>
                <strong>PC (Program Counter):</strong> {toHex(pc)}
            </p>
            <label>
                <strong>Offset de Branch (Hexadecimal, até 24 bits):</strong> 
                <input 
                    type="text" 
                    value={toHex(offset)} 
                    onChange={handleHexInput} 
                    style={{ marginLeft: '10px' }}
                    maxLength={8} // Limitar o input a 6 caracteres (0xFFFFFF)
                />
            </label>
            <button 
                onClick={handleBranch} 
                style={{ display: 'block', margin: '20px', padding: '10px 20px' }}>
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
                <em>Após o branch, o PC será atualizado para: <strong>{toHex(pc + offset)}</strong></em>
            </p>

        {/* Diagrama do MOV */}
        <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '20px 0',
            }}>
                <h3>Diagrama da Instrução MOV</h3>
                <div style={{
        border: '1px solid #000',
        padding: '10px',
        margin: '5px',
        fontFamily: 'monospace',
        textAlign: 'center',
    }}>
                    <strong>Instrução MOV</strong><br />
                    MOV r15, #0x123456<br />
                    (Onde 0x123456 é o novo valor absoluto do PC)
                </div>
                <div style={{
        margin: '10px 0',
        fontSize: '24px',
    }}>→</div>
                <div style={{
        border: '1px solid #000',
        padding: '10px',
        margin: '5px',
        fontFamily: 'monospace',
        textAlign: 'center',
    }}>
                    <strong>PC (r15)</strong><br />
                    Atualiza para: 0x123456
                </div>
            </div>
        </div>
    );
};

export default BranchComponent;