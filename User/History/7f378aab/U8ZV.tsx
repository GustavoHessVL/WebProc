import React from "react";
import { useState } from "react";
import "./Style.css";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import MemorySystem from "../../components/MemorySystem/MemorySystem";
import ToggleButton4 from "../../components/CPSRToggle/CPSRToggle";
import BranchComponent from "../../components/BranchComponent/BranchComponent";
import MovComponent from "../../components/MovComponent/MovComponent";
import AritComponent from "../../components/AritComponent/AritComponent";
import MemAccessComponent from "../../components/MemAccess/MemAccess";

const Theory1 =
  "Lorem ipsum dolor sit amet. Eum autem aliquam et eligendi numquam eos  magnam dolorum sit placeat porro ut doloremque explicabo non molestiae  facilis. Sit nulla placeat et rerum necessitatibus aut dolorem  voluptatibus et perferendis pariatur. Aut animi vitae et quibusdam  galisum ab iusto labore. Et sunt galisum qui laboriosam porro nam  officia aliquam ab impedit soluta.";

const Theory21 = "Todas as instruções do conjunto (A32) estudado na disciplina de Laboratório de Computadores possuem 32 bits e tem sua execução condicional. Os quatro bits mais significativos de toda instrução são reservados para o código de condição, que indica a condição para a instrução ser executada.";
const Theory22 = "A instrução pode ser incondicional ou ter uma condição relativa às flags do processador, no caso, Negativa (N), Zero (Z), Carry (C) e Overflow (V). É importante comentar que tais flags encontram-se no registrador de status atual do programa (CPSR).";
const Theory23 = "Ao lado é possível interagir com o diagrama para explorar as diferentes execuções condicionais.";

const Theory31 = "Dentre as instruções do conjunto A32, estão as instruções lógico-aritméticas. tais instruções podem ser descritas como operações que alteram o valor de um registrador a partir de uma operação lógico ou aritmética sobre outros dois valores, seus operandos. É importante indicar que o primeiro operando é um valor contido em um registrador e o segundo pode ser tanto um valor contido em um registrador quanto um imediato descrito na própria instrução. Portanto, uma instrução lógico aritmética tem sua estrutura marcada por um opcode, indicando a instrução em sí, um bit s, indicando se tal instrução deve alterar as flags do CPSR do processador, os registradores de primeiro operando e de destino e doze bits reservados para descrever o segundo operando.";
const Theory32 = "Como indicado nos diagramas ao lado e no primeiro trecho, o segundo operando pode assumir a forma de um valor contido em um registrador ou de um valor imediato descrito na própria instrução, tal característica é definida pelo bit I.";
const Theory33 = "No caso de I = 0, o segundo operando é do tipo valor de um registrador, podendo ser deslocado de acordo com o valor contido nos cinco bits (shifter) reservados ou de acordo com um valor contido em um registrador (Rm). Tal comportamento é definido pelo bit R. Nota-se também que o tipo do deslocamento é definido pelos dois bits reservados para o tipo, podendo ser lsl, lsr, asr e ror.";
const Theory34 = "No caso de I = 1, o segundo operando é do tipo imediato positivo, podendo ser rotacionado de acordo com os quatro bits reservados para rotação, é essencial comentar que como há apenas quatro bits reservado a rotação à direita, o valor da rotação sempre é multiplicado por dois para aumentar o alcance da rotação. Por fim, há oito bits reservados para a representação do imediato positivo não rotacionado.";
const Theory35 = "Ao lado há diagramas com a possibilidade de explorar as diferentes instruções e tipos de segundo operando.";


const Theory41 = "As instruçãos de salto são aquelas que alteram o PC(R15), alterando o fluxo de execução do programa. Um dos modos de realizar um salto é utilizando uma instrução de branch, seja ela branch(b) ou branch and link(bl) salvando o PC atual no registrador R14.";
const Theory42 = "É importante perceber que o salto com a instrução branch é relativo, ou seja, é feito a partid do PC atual! Como indicado no diagrama, na instrução além dos bits de condição, bits indicando a instrução e se há 'link', há vinte e quatro bits alocados para o offset, que deve ser interpretado como complemento de dois, assim sendo possível realizar saltos tanto para valores a frente quanto para valores atrás do PC.";
const Theory43 = "No diagrama ao lado é possível interagir para compreender melhor o formato da instrução de branch e os saltos relativos!";

const Theory51 = "Como descrito no caso do salto relativo, as instruções de salto são aquelas que alteram o PC(R15), alterando o fluxo de execução do programa. Além da utilização do branch é possível realizar um salto utilizando a operação MOV, que copia o conteúdo de um registrador para o outro. Para realizar este salto basta ter como registrador de destino o R15(PC). Nota-se que este salto é absoluto, dado que pode ser copiado qualquer valor, independente do valor atual do PC.";
const Theory52 = "É possível explorar o funcionamento deste salto no diagrama interativo ao lado!";

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
              display: 'flex',       
              justifyContent: 'center',  
              alignItems: 'center',  
              textAlign: 'justify',  
              padding: '10px',       
              margin: '10px',        
            }}>
          {Theory21}
          </div>
          <div style = {{
              display: 'flex',       
              justifyContent: 'center',
              alignItems: 'center',  
              textAlign: 'justify',   
              padding: '10px',       
              margin: '10px',        
            }}>
          {Theory22}
          </div>
          <div style = {{
              display: 'flex',       
              justifyContent: 'center',
              alignItems: 'center',  
              textAlign: 'justify',  
              padding: '10px',       
              margin: '10px',        
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

          <div className="Theory">
          <div style = {{
              display: 'flex',       
              justifyContent: 'center',  
              alignItems: 'center',  
              textAlign: 'justify',   
              padding: '10px',       
              margin: '10px',        
            }}>
          {Theory31}
          </div>
          <div style = {{
              display: 'flex',       
              justifyContent: 'center', 
              alignItems: 'center',  
              textAlign: 'justify',  
              padding: '10px',     
              margin: '10px',     
            }}>
          {Theory32}
          </div>
          <div style = {{
              display: 'flex',    
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'justify', 
              padding: '10px',  
              margin: '10px',  
            }}>
          {Theory33}
          </div>
          <div style = {{
              display: 'flex',    
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'justify',  
              padding: '10px',    
              margin: '10px',   
            }}>
          {Theory34}
          </div>
          <div style = {{
              display: 'flex',    
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'justify', 
              padding: '10px',     
              margin: '10px',     
            }}>
          {Theory35}
          </div>
          </div>
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
          <h2 className="section-title">Salto Relativo - Branch</h2>
        </div>
        <div className="ContentDiv">
          {/* Content for the second block */}

          <div className="block">{
          }
          <div>
            <BranchComponent/>
          </div>
          </div>
          <div className="Theory">
          <div style = {{
              display: 'flex',    
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'justify', 
              padding: '10px',     
              margin: '10px',     
            }}>
          {Theory41}
          </div>
          <div style = {{
              display: 'flex',    
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'justify', 
              padding: '10px',     
              margin: '10px',     
            }}>
          {Theory42}
          </div>
          <div style = {{
              display: 'flex',    
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'justify', 
              padding: '10px',     
              margin: '10px',     
            }}>
          {Theory43}
          </div>
            </div>
        </div>
      </div>
      <div className="section">
        {" "}
        <div className="TitleDiv">
          <h2 className="section-title">Salto Absoluto - MOV</h2>
        </div>
        <div className="ContentDiv">
          {/* Content for the second block */}
          <div className="Theory">
          <div style = {{
              display: 'flex',    
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'justify', 
              padding: '10px',     
              margin: '10px',     
            }}>
          {Theory51}
          </div>
          <div style = {{
              display: 'flex',    
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'justify', 
              padding: '10px',     
              margin: '10px',     
            }}>
          {Theory52}
          </div>
          </div>
          <div className="block">{
          }
          <div>
            <MovComponent/>
          </div>
          </div>
        </div>
        <div className="ContentDiv">
          {/* Content for the second block */}
          <div className="block">{
          }
          <div>
            <MemAccessComponent/>
          </div>
          </div>
          <div className="Theory">
          <div style = {{
              display: 'flex',    
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'justify', 
              padding: '10px',     
              margin: '10px',     
            }}>
          {"bruh"}
          </div>
          <div style = {{
              display: 'flex',    
              justifyContent: 'center', 
              alignItems: 'center', 
              textAlign: 'justify', 
              padding: '10px',     
              margin: '10px',     
            }}>
          {"bruh"}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
