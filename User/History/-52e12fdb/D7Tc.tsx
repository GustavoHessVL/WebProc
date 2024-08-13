import React, { useState,useEffect } from 'react';

const ToggleButton4 = () => {
  // Initial state for the four buttons, all set to 0
  const [buttonStates, setButtonStates] = useState([0, 0, 0, 0]);
  const [combinationText, setCombinationText] = useState('');

  const [buttonStates2, setButtonStates2] = useState([0, 0, 0, 0]);
  const [combinationText2, setCombinationText2] = useState('');

  const [executionText, setExecutionText] = useState('');

  // Function to toggle a button's value between 0 and 1
  const toggleButton = (index: number) => {
    const newStates = [...buttonStates];
    newStates[index] = newStates[index] === 0 ? 1 : 0;
    setButtonStates(newStates);
  };

  const toggleButton2 = (index: number) => {
    const newStates = [...buttonStates2];
    newStates[index] = newStates[index] === 0 ? 1 : 0;
    setButtonStates2(newStates);
  };
  // Define a type for the possible combinations
  type CombinationMap = {
    [key: string]: string;
  };

  type CombinationMap2 = {
    [key: string]: string;
  };

  // Object mapping button state combinations to their respective text
  const combinations2: CombinationMap = {
    '0000': 'igual(eq)',
    '0001': 'diferente(ne)',
    '0010': 'carry(cs)',
    '0011': 'sem carry(cc)',
    '0100': 'negativo(mi)',
    '0101': 'não negativo(pl)',
    '0110': 'overflow(vs)',
    '0111': 'sem overflow(vc)',
    '1000': 'maior que (hi)',
    '1001': 'menor ou igual(ls)',
    '1010': 'maior ou igual(ge)',
    '1011': 'menor que (lt)',
    '1100': 'maior que (gt)',
    '1101': 'menor ou igual(le)',
    '1110': 'Incondicional',
    '1111': 'Inválido',
  };

  const combinations: CombinationMap = {
    '0000': 'Sem flags up',
    '0001': 'Overflow',
    '0010': 'Carry ',
    '0011': 'Carry e Overflow',
    '0100': 'Resultado Nulo',
    '0101': 'Resultado Nulo e Overflow',
    '0110': 'Resultado Nulo e Carry',
    '0111': 'Resultado Nulo, Carry e Overflow',
    '1000': 'Resultado Negativo',
    '1001': 'Resultado Negativo e Overflow',
    '1010': 'Resultado Negativo e Carry',
    '1011': 'Resultado Negativo, Carry e Overflow',
    '1100': 'Resultado Negativo e Resultado Nulo',
    '1101': 'Resultado Negativo, Resultado Nulo e Overflow',
    '1110': 'Resultado Negativo, Resultado Nulo e Carry',
    '1111': 'Resultado Negativo, Resultado Nulo, Carry e Overflow',
  };

  // Function to determine text based on the current combination of states
  const getCombinationText = (states: number[]) => {
    const key = states.join('');
    return combinations[key] || 'Unknown Combination';
  };

  const getCombinationText2 = (states: number[]) => {
    const key = states.join('');
    return combinations2[key] || 'Unknown Combination';
  };

  const calculateExecution = (condState : number[], cpsrState: number[]) => {
    const condKey = condState.join('');
    switch(condKey){
      case '0000':
      case '0001':
      case '0010':
      case '0011':
      case '0100':
      case '0101':
      case '0110':
      case '0111':
      case '1000':
      case '1001':
      case '1010':
      case '1011':
      case '1100':
      case '1101':
        if (cpsrState[1] == 1) {
          return "Executa instrução! Zero Flag ativa indica igualdade!";
        }
        else if(cpsrState[0] == 0 && cpsrState[3] == 0){
          return "Executa instrução! Negative Flag ativa indica que o número é menor e o overflow em baixa indica que a conta respeitou o tamanho utilizado!"
        }
        return "Não executa instrução!";
      case '1110':
        return "Execução da instrução ocorre, dado que a execução é incondicional";
      case '1111':
        return "Caso Inválido";
      default:
          return "Caso ?";
    }
  }


  const getLetterForIndex = (index: number) => {
    switch (index) {
      case 0:
        return 'N';
      case 1:
        return 'Z';
      case 2:
        return 'C';
      case 3:
        return 'V';
      default:
        return '';
    }
  };

  // Update the combination text whenever button states change
  useEffect(() => {
    setCombinationText(getCombinationText(buttonStates));
    setCombinationText2(getCombinationText2(buttonStates2));
    setExecutionText(calculateExecution(buttonStates2,buttonStates));
  }, [buttonStates,buttonStates2]);

  return (
    <div>
        <h2>CPSR</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {buttonStates.map((state, index) => (
          <div>
          <button
            key={index}
            onClick={() => toggleButton(index)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            {state}
          </button>
            <div>
              {getLetterForIndex(index)}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3> </h3>
        <div
          style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '18px',
            color: 'black',
            backgroundColor: '#f9f9f9',
            maxWidth: '200px',
          }}
        >
          {combinationText}
        </div>
      </div>
      
      <h2>Bits de Condição</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {buttonStates2.map((state, index) => (
          <div>
          <button
            key={index}
            onClick={() => toggleButton2(index)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            {state}
          </button>
          </div>
        ))}
        
      </div>
      <div>
        <h3> </h3>
        <div
          style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '18px',
            color: 'black',
            backgroundColor: '#f9f9f9',
            maxWidth: '200px',
          }}
        >
          {combinationText2}
        </div>
      </div>
          {/* Texto ao lado */}
      <div>
        <h3>Execução:</h3>
        <div
          style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '18px',
            color: 'black',
            backgroundColor: '#f9f9f9',
            maxWidth: '200px',
          }}
        >
          {executionText}
        </div>
      </div>
    </div>
  );
};

export default ToggleButton4;
