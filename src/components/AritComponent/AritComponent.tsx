import React, { useState, ChangeEvent, useEffect } from 'react';

interface BinaryInputProps {
    size: number; // Number of bits (e.g., 8 for 8 bits)
    onValueChange: (value: string) => void;
  }
  
  const BinaryInput: React.FC<BinaryInputProps> = ({ size, onValueChange }) => {
    const [value, setValue] = useState<string>('');
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      
      // Only allow binary characters and restrict input to the specified size
      const binaryValue = inputValue
        .replace(/[^01]/g, '') // Remove non-binary characters
        .slice(0, size); // Restrict to the specified size
      
      setValue(binaryValue);
      if(binaryValue != '' &&  binaryValue.length == size)
          onValueChange(binaryValue); // Pass the binary value to the parent component
    };
    
    return (
      <input
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={size}
        style={{ 
          fontFamily: 'monospace', 
          textAlign: 'center', 
          width: `${size * 20}px`, 
          padding: '5px',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      />
    );
  };

const AritComponent: React.FC = () => {
    
    // SEM IMEDIATO
    const [opcode, setOpcode] = useState<string>('xxxx'); // opcode 4 bits
    const [s, setS] = useState<string>('x'); // S flag modify 1 bit
    const [Rn, setRn] = useState<string>('xxxx'); // Register operando 1 4 bits
    const [Rd, setRd] = useState<string>('xxxx'); // Register destino  4 bits
    const [shifter, setShifter] = useState<string>('xxxxx');
    const [tipo, setTipo] = useState<string>('xx'); // 2bits
    const [R, setR] = useState<string>('x'); // 1 bit
    const [Rm, setRm] = useState<string>('xxxx');
    const [Instruc1,setInstruc1] = useState<string>('NOINST');

    // COM IMEDIATO
    const [rotacao, setRotacao] = useState<string>('xxxx'); // rotacao 4 bits
    const [imediato, setImediato] = useState<string>('xxxxxxxx'); // IMEDIATO 8 bits

    const [executionText, setExecutionText] = useState('');

    const [executionText2, setExecutionText2] = useState('');

    type CombinationMap = {
        [key: string]: string;
      };

    const opcodeComb: CombinationMap = {
        '0000': 'and',
        '0001': 'eor',
        '0010': 'sub',
        '0011': 'rsb',
        '0100': 'add',
        '0101': 'adc',
        '0110': 'sbc',
        '0111': 'rsc',
        '1000': 'tst',
        '1001': 'teq',
        '1010': 'cmp',
        '1011': 'cmn',
        '1100': 'orr',
        '1101': 'mov',
        '1110': 'bic',
        '1111': 'mvn',
      };

      const getOpcodeText = (states: string) => {
        const key = states;
        return opcodeComb[key] || 'NOINST';
      };

    const calculateExecutionText = (opcode:string,s:string,Rn:string,Rd:string,shifter:string,tipo:string,R:string,Rm:string) => {
        var result = '';
        result = result.concat('Sua instrução é ' + getOpcodeText(opcode) + '.')
        if(s != 'x'){
            if(s == '1'){
                result = result.concat(' Ademais, o bit s está ativo, indicando que a operação altera flags do processador.');
            }
        }
        if(R != 'x' ){
            if(shifter == '00000'){
                result = result.concat(' Não há shift sobre o segundo operando, visto que shifter é 00000')
            }
            else {
                if(R == '1'){
                    if(shifter != 'xxxxx'){
                        result = result.concat(' Sobre o segundo operando há um shift, como o bit R está ativo, é um shift de acordo com o valor do registrador dos quatro bits mais significativos do shifter : ' + shifter.slice(0,4)) + '.';
                    }
                }
                else{
                    if(shifter != 'xxxxx'){
                        result = result.concat(' Como R = 0, há um shift sobre o segundo operando de acordo com o valor do shifter : ' + shifter + '.');
                    }
                }
                if(shifter != 'xxxxx'){
                    if(tipo != 'xx'){
                        if(tipo == '00'){
                            result = result.concat(' Por fim, ainda sobre o deslocamento no operando, o tipo é ' + tipo + ', portanto, é um deslocamento lógico à esquerda(lsl).')
                        }
                        else if(tipo == '01'){
                            result = result.concat(' Por fim, ainda sobre o deslocamento no operando, o tipo é ' + tipo + ', portanto, é um deslocamento lógico à direita(lsr).')
                        }
                        else if(tipo == '10'){
                            result = result.concat(' Por fim, ainda sobre o deslocamento no operando, o tipo é ' + tipo + ', portanto, é um deslocamento aritmético à esquerda(asr).')
                        }
                        else if(tipo == '11'){
                            result = result.concat(' Por fim, ainda sobre o deslocamento no operando, o tipo é ' + tipo + ', portanto, é uma rotação à direita (ror).')
                        }
                    }
                }
            }
        }
        return result;
    }

    const calculateExecutionText2 = (rotacao:string, imediato:string) =>{
        var result = 'A instrução lógico-aritmética tem como segundo operando um imediato. ';
        if(imediato != 'xxxxxxxx' && rotacao != 'xxxx'){
            result = result.concat('O Imediato de 8 bits (' + imediato + ') é posicionado em uma palavra de 32 bits de acordo com a rotacao, nesse caso, desloca-se o valor em: '  + parseInt(rotacao.concat('0'),2))
        }
        return result;
    }

    useEffect(() => {
        setExecutionText2(calculateExecutionText2(rotacao,imediato));
        setExecutionText(calculateExecutionText(opcode,s,Rn,Rd,shifter,tipo,R,Rm));
      }, [opcode,s,Rn,Rd,shifter,tipo,R,Rm,imediato,rotacao]);

return (
<div>
<p style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '15px',
            color: 'black',
            backgroundColor: '#f9f9f9',
          }}>
                <strong>Instrução Lógico-Aritmética Genérica:</strong> <br />
                <p></p>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"condição"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"00"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"I"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"opcode"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"s"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"Rn"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"Rd"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"Segundo Operando"}</span>
                </div>
            </p>

        <p style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '15px',
            color: 'black',
            backgroundColor: '#f9f9f9',
          }}>
                <strong>Instrução Lógico-Aritmética Sem Imediato(I = 0):</strong> <br />
                <p></p>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"condição"}</span>
                <div style={{fontSize: '12px' }}>condição</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"00"}</span>
                <div style={{fontSize: '12px' }}>00</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"0"}</span>
                <div style={{fontSize: '12px' }}>I</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={4} onValueChange={setOpcode} />
                <div style={{fontSize: '12px' }}>opcode</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={1} onValueChange={setS} />
                <div style={{fontSize: '12px' }}>{"s"}</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={4} onValueChange={setRn} />
                <div style={{fontSize: '12px' }}>{"Rn"}</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={4} onValueChange={setRd} />
                <div style={{fontSize: '12px' }}>{"Rd"}</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={5} onValueChange={setShifter} />
                <div style={{fontSize: '12px' }}>{"shifter"}</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={2} onValueChange={setTipo} />
                <div style={{fontSize: '12px' }}>{"tipo"}</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={1} onValueChange={setR} />
                <div style={{fontSize: '12px' }}>{"R"}</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={5} onValueChange={setRm} />
                <div style={{fontSize: '12px' }}>{"Rm"}</div>
                </div>
                <p></p>
                <div>
                    <div
                    style={{
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '18px',
                        color: 'black',
                        backgroundColor: '#d8f8f8',
                    }}
                    >
                    {executionText}
                    </div>
                </div>
            </p>
                    

            <p style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '15px',
            color: 'black',
            backgroundColor: '#f9f9f9',
          }}>
                <strong>Instrução Lógico-Aritmética Com Imediato(I = 1):</strong> <br />
                <p></p>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"condição"}</span>
                <div style={{fontSize: '12px' }}>condição</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"00"}</span>
                <div style={{fontSize: '12px' }}>00</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"1"}</span>
                <div style={{fontSize: '12px' }}>I</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"opcode"}</span>
                <div style={{fontSize: '12px' }}>opcode</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"s"}</span>
                <div style={{fontSize: '12px' }}>s</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"Rn"}</span>
                <div style={{fontSize: '12px' }}>Rn</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '50px',
                }}>{"Rd"}</span>
                <div style={{fontSize: '12px' }}>Rd</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={4} onValueChange={setRotacao} />
                <div style={{fontSize: '12px' }}>{"Rotação"}</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={8} onValueChange={setImediato} />
                <div style={{fontSize: '12px' }}>{"Imediato"}</div>
                </div>
                <div>
                    <div
                    style={{
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '18px',
                        color: 'black',
                        backgroundColor: '#d8f8f8',
                    }}
                    >
                    {executionText2}
                    </div>
                </div>
            </p>
</div>
);
};

export default AritComponent;