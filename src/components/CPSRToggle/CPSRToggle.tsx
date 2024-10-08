import React, { useState, useEffect } from "react";

const ToggleButton4 = () => {
  const [buttonStates, setButtonStates] = useState([0, 0, 0, 0]);
  const [combinationText, setCombinationText] = useState("");

  const [buttonStates2, setButtonStates2] = useState([0, 0, 0, 0]);
  const [combinationText2, setCombinationText2] = useState("");

  const [executionText, setExecutionText] = useState("");

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
  type CombinationMap = {
    [key: string]: string;
  };

  type CombinationMap2 = {
    [key: string]: string;
  };

  const combinations2: CombinationMap = {
    "0000": "igual(eq)",
    "0001": "diferente(ne)",
    "0010": "carry(cs)",
    "0011": "sem carry(cc)",
    "0100": "negativo(mi)",
    "0101": "não negativo(pl)",
    "0110": "overflow(vs)",
    "0111": "sem overflow(vc)",
    "1000": "maior que (hi)",
    "1001": "menor ou igual(ls)",
    "1010": "maior ou igual(ge)",
    "1011": "menor que (lt)",
    "1100": "maior que (gt)",
    "1101": "menor ou igual(le)",
    "1110": "Incondicional",
    "1111": "Inválido",
  };

  const combinations: CombinationMap = {
    "0000": "Sem flags up",
    "0001": "Overflow",
    "0010": "Carry ",
    "0011": "Carry e Overflow",
    "0100": "Resultado Nulo",
    "0101": "Resultado Nulo e Overflow",
    "0110": "Resultado Nulo e Carry",
    "0111": "Resultado Nulo, Carry e Overflow",
    "1000": "Resultado Negativo",
    "1001": "Resultado Negativo e Overflow",
    "1010": "Resultado Negativo e Carry",
    "1011": "Resultado Negativo, Carry e Overflow",
    "1100": "Resultado Negativo e Resultado Nulo",
    "1101": "Resultado Negativo, Resultado Nulo e Overflow",
    "1110": "Resultado Negativo, Resultado Nulo e Carry",
    "1111": "Resultado Negativo, Resultado Nulo, Carry e Overflow",
  };

  const getCombinationText = (states: number[]) => {
    const key = states.join("");
    return combinations[key] || "Unknown Combination";
  };

  const getCombinationText2 = (states: number[]) => {
    const key = states.join("");
    return combinations2[key] || "Unknown Combination";
  };

  const calculateExecution = (condState: number[], cpsrState: number[]) => {
    const condKey = condState.join("");
    switch (condKey) {
      case "0000":
        if (cpsrState[1] == 1) {
          return "Executa instrução! Zero flag ativa indica igualdade na comparação!";
        }
        return "Não executa instrução!";
      case "0001":
        if (cpsrState[1] == 0) {
          return "Executa instrução! Zero flag inativa indica não igualdade na comparação!";
        }
        return "Não executa instrução!";
      case "0010":
        if (cpsrState[2] == 1) {
          return "Executa instrução! Flag Carry ativa e condição de carry!";
        }
        return "Não executa instrução!";
      case "0011":
        if (cpsrState[2] == 0) {
          return "Executa instrução! Flag carry inativa e condição sem carry!";
        }
        return "Não executa instrução!";
      case "0100":
        if (cpsrState[0] == 1) {
          return "Executa instrução! Flag negativa ativa e condição de negativo!";
        }
        return "Não executa instrução!";
      case "0101":
        if (cpsrState[0] == 0) {
          return "Executa instrução! Flag negativa inativa e condição não negativa!";
        }
        return "Não executa instrução!";
      case "0110":
        if (cpsrState[3] == 1) {
          return "Executa instrução! Flag overflow ativa e condição overflow!";
        }
        return "Não executa instrução!";
      case "0111":
        if (cpsrState[3] == 0) {
          return "Executa instrução! Flag overflow inativa e condição sem overflow!";
        }
        return "Não executa instrução!";
      case "1000":
        // Precisa justificar !!!!!!!! -> Justificado
        if (cpsrState[1] == 0 && cpsrState[2] == 1) {
          return "Executa instrução! Carry flag ativa indica que o número comparado é maior! Zero flag inativa garante que o número comparado não é igual! É importante notal que nesse caso o sinal é desconsiderado";
        }
        return "Não executa instrução!";
      case "1001":
        // PRECISA JUSTIFICAR!!!!!!!!!!!!!! -> Justificado
        if (cpsrState[2] == 0) {
          return "Executa instrução! Carry flag inativa indica que não é maior! É importante notal que nesse caso o sinal é desconsiderado";
        } else if (cpsrState[1] == 1) {
          return "Executa instrução! Zero flag ativa indica que é igual! É importante notal que nesse caso o sinal é desconsiderado";
        }
        return "Não executa instrução!";
      case "1010":
        if (cpsrState[0] == 0 && cpsrState[3] == 0) {
          return "Executa instrução! Negativo inativo e sem Overflow indica não ser negativo o resultado! Logo, ser maior ou igual! Nota-se por exemplo em uma subtração de dois positivos resultando em um positivo(a - b = não negativo -> a >= b )! ";
        } else if (cpsrState[0] == 1 && cpsrState[2] == 1) {
          // NECESSITA DE JUSTIFICATIVA -> Justificado
          return "Executa instrução! Negativo ativo e Overflow ativo! Ocorre, por exemplo, na subtração de dois números negativos quando um é, em modulo, maior que o outro, resultando em um negativo!";
        }
        return "Não executa instrução!";
      case "1011":
        if (cpsrState[0] == 0 && cpsrState[3] == 1) {
          // NECESSITA DE JUSTIFICATIVA -> Justificado
          return "Executa instrução! Negativo inativo e com Overflow! Nota-se por exemplo em uma subtração de dois negativos resultando em um positivo [ a,b < 0 ](a - b =  positivo -> a < b )! ";
        } else if (cpsrState[0] == 1 && cpsrState[2] == 0) {
          // NECESSITA DE JUSTIFICATIVA -> Justificado
          return "Executa instrução! Negativo ativo e Overflow invativo! Ocorre, por exemplo, na subtração de dois números positivos resultando em um negativo [a,b > 0](a - b = negativo -> a < b)!";
        }
        return "Não executa instrução!";
      case "1100":
        if (cpsrState[3] == 0 && cpsrState[1] == 0 && cpsrState[0] == 0) {
          return "Executa instrução! Overflow e Negativo Flag ambos em baixa e Zero Flag inativa. Nota-se que isso ocorreria, por exemplo, na subtração de dois números positivos resultando em um positivo [a, b > 0]( a - b = positivo -> a > b)";
        }
        if (cpsrState[0] == 1 && cpsrState[1] == 0 && cpsrState[3] == 1) {
          // Precisa justificar, não lembro -> Justificado
          return "Executa Instrução! Overflow e Negativo Flag ambos em alta e Zero Flag inativa. Nota-se que isso ocorreria, por exemplo, na subtração de dois números negativos resultando em um negativo [a, b < 0]( a - b = negativo -> a > b)";
        }
        return "Não executa instrução!";
      case "1101":
        if (cpsrState[1] == 1) {
          return "Executa instrução! Zero Flag ativa indica igualdade!";
        } else if (cpsrState[0] == 1 && cpsrState[3] == 0) {
          return "Executa instrução! Negative Flag ativa indica que o número é menor e o overflow em baixa indica que a conta respeitou o tamanho utilizado!";
        } else if (cpsrState[0] == 0 && cpsrState[3] == 1) {
          // Incrementar
          return "Executa instrução! Negative flag inativa e Overflow flag ativa!";
        }
        return "Não executa instrução!";
      case "1110":
        return "Execução da instrução ocorre, dado que a execução é incondicional";
      case "1111":
        return "Caso Inválido";
      default:
        return "Caso ?";
    }
  };

  const getLetterForIndex = (index: number) => {
    switch (index) {
      case 0:
        return "N";
      case 1:
        return "Z";
      case 2:
        return "C";
      case 3:
        return "V";
      default:
        return "";
    }
  };

  useEffect(() => {
    setCombinationText(getCombinationText(buttonStates));
    setCombinationText2(getCombinationText2(buttonStates2));
    setExecutionText(calculateExecution(buttonStates2, buttonStates));
  }, [buttonStates, buttonStates2]);

  return (
    <div>
      <h2>CPSR</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {buttonStates.map((state, index) => (
          <div>
            <button
              key={index}
              onClick={() => toggleButton(index)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {state}
            </button>
            <div>{getLetterForIndex(index)}</div>
          </div>
        ))}
      </div>
      <div>
        <h3> </h3>
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "18px",
            color: "black",
            backgroundColor: "#f9f9f9",
            maxWidth: "200px",
          }}
        >
          {combinationText}
        </div>
      </div>

      <h2>Bits de Condição</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {buttonStates2.map((state, index) => (
          <div>
            <button
              key={index}
              onClick={() => toggleButton2(index)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
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
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "18px",
            color: "black",
            backgroundColor: "#f9f9f9",
            maxWidth: "200px",
          }}
        >
          {combinationText2}
        </div>
      </div>
      <div>
        <h3>Execução:</h3>
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "18px",
            color: "black",
            backgroundColor: "#f9f9f9",
            maxWidth: "200px",
          }}
        >
          {executionText}
        </div>
      </div>
    </div>
  );
};

export default ToggleButton4;
