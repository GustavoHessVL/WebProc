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

    return (
        <div style={{ fontFamily: 'Arial', maxWidth: '400px', margin: '20px auto' }}>
            <h2>Simulação de Instrução de Branch (ARM)</h2>
            <p>
                <strong>PC (Program Counter):</strong> {toHex(pc)}
            </p>
            <label>
                <strong>Offset de Branch (Hexadecimal):</strong> 
                <input 
                    type="text" 
                    value={toHex(offset)} 
                    onChange={handleHexInput} 
                    style={{ marginLeft: '10px' }}
                />
            </label>
            <button 
                onClick={handleBranch} 
                style={{ display: 'block', margin: '20px 0', padding: '10px 20px' }}>
                Executar Branch
            </button>
            <p>
                <em>Após o branch, o PC será atualizado para o valor: <strong>{toHex(pc + offset)}</strong></em>
            </p>
        </div>
    );
};

export default BranchComponent;