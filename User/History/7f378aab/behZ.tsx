import React from "react";
import { useState } from "react";
import "./Style.css";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import MemorySystem from "../../components/MemorySystem/MemorySystem";
import ToggleButton4 from "../../components/CPSRToggle/CPSRToggle";
import BranchComponent from "../../components/BranchComponent/BranchComponent";
import MovComponent from "../../components/MovComponent/MovComponent";
import AritComponent from "../../components/AritComponent/AritComponent";


const Theory1 =
  "Lorem ipsum dolor sit amet. Eum autem aliquam et eligendi numquam eos  magnam dolorum sit placeat porro ut doloremque explicabo non molestiae  facilis. Sit nulla placeat et rerum necessitatibus aut dolorem  voluptatibus et perferendis pariatur. Aut animi vitae et quibusdam  galisum ab iusto labore. Et sunt galisum qui laboriosam porro nam  officia aliquam ab impedit soluta.";

const Theory21 = "Todas as instruções do conjunto (A32) estudado na disciplina de Laboratório de Computadores possuem 32 bits e tem sua execução condicional. Os quatro bits mais significativos de toda instrução são reservados para o código de condição, que indica a condição para a instrução ser executada.";
const Theory22 = "A instrução pode ser incondicional ou ter uma condição relativa às flags do processador, no caso, Negativa (N), Zero (Z), Carry (C) e Overflow (V). É importante comentar que tais flags encontram-se no registrador de status atual do programa (CPSR).";
const Theory23 = "Ao lado é possível interagir com o diagrama para explorar as diferentes execuções condicionais.";
const Theory3 = "";
const Theory4 = "";


/* Do a button that switches between 0 and 1*/

const Instructions: React.FC = () => {
  return (
    <div className="container">
      <h1>WebProc Project</h1>
      <p>Interactive Learning System</p>
      <div className="section">
        {" "}
        <div className="TitleDiv">
          <h2 className="section-title">Execução Condicional</h2>
        </div>
      </div>
      <div className="ContentDiv">
        {/* Content for the second block */}

        <div className="block">
          {
            // <button onClick={changeButton}>{button.valueOf()}</button>
          }
          <div>
            <ToggleButton4/>
          </div>
        </div>
        <div className="Theory">
          <div style = {{
              display: 'flex',       // Usar flexbox para centralização
              justifyContent: 'center',  // Centralizar horizontalmente
              alignItems: 'center',  // Centralizar verticalmente (se aplicável, ex. em um container com altura definida)
              textAlign: 'center',   // Centralizar o texto dentro do elemento
              padding: '20px',       // Adicionar espaço em volta do texto
              margin: '20px',        // Adicionar espaço externo ao redor do elemento
            }}>
          {Theory21}
          </div>
          <div style = {{
              display: 'flex',       // Usar flexbox para centralização
              justifyContent: 'center',  // Centralizar horizontalmente
              alignItems: 'center',  // Centralizar verticalmente (se aplicável, ex. em um container com altura definida)
              textAlign: 'center',   // Centralizar o texto dentro do elemento
              padding: '20px',       // Adicionar espaço em volta do texto
              margin: '20px',        // Adicionar espaço externo ao redor do elemento
            }}>
          {Theory22}
          </div>
          <div style = {{
              display: 'flex',       // Usar flexbox para centralização
              justifyContent: 'center',  // Centralizar horizontalmente
              alignItems: 'center',  // Centralizar verticalmente (se aplicável, ex. em um container com altura definida)
              textAlign: 'center',   // Centralizar o texto dentro do elemento
              padding: '20px',       // Adicionar espaço em volta do texto
              margin: '20px',        // Adicionar espaço externo ao redor do elemento
            }}>
          {Theory23}
          </div>
          </div>
      </div>
      <div className="section">
        {" "}
        <div className="TitleDiv">
          <h2 className="section-title">Instruções Lógico-Aritméticas</h2>
        </div>
        <div className="ContentDiv">
          {/* Content for the second block */}

          <div className="Theory">{"As intruções Load / Store"}</div>
          <div className="block">
            <div>
              <AritComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        {" "}
        <div className="TitleDiv">
          <h2 className="section-title">Desvio Relativo - Branch</h2>
        </div>
        <div className="ContentDiv">
          {/* Content for the second block */}

          <div className="block">{
          }
          <div>
            <BranchComponent/>
          </div>
          </div>
          <div className="Theory">{/* Content for the second block */}</div>
        </div>
      </div>
      <div className="section">
        {" "}
        <div className="TitleDiv">
          <h2 className="section-title">Desvio Absoluto - Mov</h2>
        </div>
        <div className="ContentDiv">
          {/* Content for the second block */}
          <div className="Theory">{/* Content for the second block */}</div>
          <div className="block">{
          }
          <div>
            <MovComponent/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
