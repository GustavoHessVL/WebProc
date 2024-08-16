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

const MemAccessComponent: React.FC = () => {

    // COM IMEDIATO
    const [imediato, setImediato] = useState<string>('xxxxxxxxxxxx'); // IMEDIATO 12 bits
    const [P1, setP1] = useState<string>('x'); // 1 bit
    const [U1, setU1] = useState<string>('x'); // 1 bit
    const [B1, setB1] = useState<string>('x'); // 1 bit
    const [W1, setW1] = useState<string>('x'); // 1 bit
    const [L1, setL1] = useState<string>('x'); // 1 bit
    const [instruc1, setInstruc1] = useState<string>('');
    const [execText1, setExecText1] = useState<string>('');

    // COM REGISTRADOR DE ÍNDICE
    const [shift, setShift] = useState<string>('xxxxx'); //5 bits
    const [tipo, setTipo] = useState<string>('xx'); // 2 bits
    const [P2, setP2] = useState<string>('x'); // 1 bit
    const [U2, setU2] = useState<string>('x'); // 1 bit
    const [B2, setB2] = useState<string>('x'); // 1 bit
    const [W2, setW2] = useState<string>('x'); // 1 bit
    const [L2, setL2] = useState<string>('x'); // 1 bit
    const [instruc2, setInstruc2] = useState<string>('');
    const [execText2, setExecText2] = useState<string>('');


    const calculateInstruc = (P:string, U:string,W:string,L:string,imediato:string) =>{
        var result = '';
        if(L == 'x' || P == 'x' || U == 'x' || W == 'x' || imediato =='xxxxxxxxxxxx'){
            return result;
        }
        if(L == '1'){
            result = result.concat('ldr ')
        }
        else{
            result = result.concat('str ')
        }

        if(P == '0' && U == '1'){
            result = result.concat('Rd, [Rn], #' + parseInt(imediato,2))
            return result;
        }
        else if(P == '0' && U == '0'){
            result = result.concat('Rd, [Rn], #-' + parseInt(imediato,2))
            return result;
        }
        else if(P == '1' && U == '1' && W == '0'){
            result = result.concat('Rd, [Rn, #' + parseInt(imediato,2) + ']')
            return result;
        }
        else if(P == '1' && U == '0' && W == '0'){
            result = result.concat('Rd, [Rn, #-' + parseInt(imediato,2) + ']')
            return result;
        }
        else if(P == '1' && U == '1' && W == '1'){
            result = result.concat('Rd, [Rn, #' + parseInt(imediato,2) + ']!')
            return result;
        }
        else if(P == '1' && U == '0' && W == '1'){
            result = result.concat('Rd, [Rn, #-' + parseInt(imediato,2) + ']!')
            return result;
        }

        return result;
    }

    const calculateInstruc2 = (P:string, U:string,W:string,L:string,shift:string, tipo:string) =>{
        var result = '';
        var shiftString = '';
        
        if(tipo == '00'){
         shiftString = ', lsl '.concat('#' + parseInt(shift,2))
        }

        if(L == 'x' || P == 'x' || U == 'x' || W == 'x'  || tipo == 'xx' || shift == 'xxxxx'){
            return result;
        }
        if(L == '1'){
            result = result.concat('ldr ')
        }
        else{
            result = result.concat('str ')
        }

        if(P == '0' && U == '1'){
            result = result.concat('Rd, [Rn], #' + parseInt(imediato,2))
            return result;
        }
        else if(P == '0' && U == '0'){
            result = result.concat('Rd, [Rn], #-' + parseInt(imediato,2))
            return result;
        }
        else if(P == '1' && U == '1' && W == '0'){
            result = result.concat('Rd, [Rn, #' + parseInt(imediato,2) + ']')
            return result;
        }
        else if(P == '1' && U == '0' && W == '0'){
            result = result.concat('Rd, [Rn, #-' + parseInt(imediato,2) + ']')
            return result;
        }
        else if(P == '1' && U == '1' && W == '1'){
            result = result.concat('Rd, [Rn, #' + parseInt(imediato,2) + ']!')
            return result;
        }
        else if(P == '1' && U == '0' && W == '1'){
            result = result.concat('Rd, [Rn, #-' + parseInt(imediato,2) + ']!')
            return result;
        }

        return result;
    }

    const calculateExecText2 = (P:string, U:string,W:string,L:string,shift:string, tipo :string) =>{
        var result = '';
        if(L == 'x' || P == 'x' || U == 'x' || W == 'x' || tipo == 'xx' || shift == 'xxxxx'){
            return result;
        }
        

        if(P == '0' && U == '1'){
            result = "Pós-indexado com offset positivo, logo escreve/le da memória no valor da base e depois atualiza a base com base + offset"
            return result;
        }
        else if(P == '0' && U == '0'){
            result = "Pós-indexado com offset negativo, logo escreve/le da memória no valor da base e depois atualiza a base com base - offset"
            return result;
        }
        else if(P == '1' && U == '1' && W == '0'){
            result = "Pré-indexado com offset positivo, logo escreve/le da memória no valor da base + offset sem alterar a base"
            return result;
        }
        else if(P == '1' && U == '0' && W == '0'){
            result = "Pré-indexado com offset negativo, logo escreve/le da memória no valor da base - offset sem alterar a base"
            return result;
        }
        else if(P == '1' && U == '1' && W == '1'){
            result = "Pré-indexado com offset positivo alterando base, logo escreve/le da memória no valor da base + offset, alterando a base para esse valor"
            return result;
        }
        else if(P == '1' && U == '0' && W == '1'){
            result = "Pré-indexado com offset negativo alterando base, logo escreve/le da memória no valor da base - offset, alterando a base para esse valor"
            return result;
        }

        return result;
    }

    const calculateExecText1 = (P:string, U:string,W:string,L:string,imediato:string) =>{
        var result = '';
        if(L == 'x' || P == 'x' || U == 'x' || W == 'x' || imediato =='xxxxxxxxxxxx'){
            return result;
        }
        

        if(P == '0' && U == '1'){
            result = "Pós-indexado com offset positivo, logo escreve/le da memória no valor da base e depois atualiza a base com base + offset"
            return result;
        }
        else if(P == '0' && U == '0'){
            result = "Pós-indexado com offset negativo, logo escreve/le da memória no valor da base e depois atualiza a base com base - offset"
            return result;
        }
        else if(P == '1' && U == '1' && W == '0'){
            result = "Pré-indexado com offset positivo, logo escreve/le da memória no valor da base + offset sem alterar a base"
            return result;
        }
        else if(P == '1' && U == '0' && W == '0'){
            result = "Pré-indexado com offset negativo, logo escreve/le da memória no valor da base - offset sem alterar a base"
            return result;
        }
        else if(P == '1' && U == '1' && W == '1'){
            result = "Pré-indexado com offset positivo alterando base, logo escreve/le da memória no valor da base + offset, alterando a base para esse valor"
            return result;
        }
        else if(P == '1' && U == '0' && W == '1'){
            result = "Pré-indexado com offset negativo alterando base, logo escreve/le da memória no valor da base - offset, alterando a base para esse valor"
            return result;
        }

        return result;
    }

    useEffect(() => {
        setInstruc1(calculateInstruc(P1,U1,W1,L1,imediato))
        setExecText1(calculateExecText1(P1,U1,W1,L1,imediato))
      }, [imediato,P1,U1,B1,W1,L1]);


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
                <strong>Instrução LOAD/STORE Genérica:</strong> <br />
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
                }}>{"010"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '25px',
                }}>{"P"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '25px',
                }}>{"U"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '25px',
                }}>{"B"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '25px',
                }}>{"W"}</span>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '25px',
                }}>{"L"}</span>
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
                    minWidth: '100px',
                }}>{"índice para somar com a base"}</span>
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
                <strong>Instrução LOAD/STORE com Offset Imediato:</strong> <br />
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
                }}>{"010"}</span>
                <div style={{fontSize: '12px' }}>010</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={1} onValueChange={setP1} />
                <div style={{fontSize: '12px' }}>P</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={1} onValueChange={setU1} />
                <div style={{fontSize: '12px' }}>U</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '25px',
                }}>{"0"}</span>
                <div style={{fontSize: '12px' }}>B</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={1} onValueChange={setW1} />
                <div style={{fontSize: '12px' }}>W</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={1} onValueChange={setL1} />
                <div style={{fontSize: '12px' }}>L</div>
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
                <BinaryInput size={12} onValueChange={setImediato} />
                <div style={{fontSize: '12px' }}>Offset Imediato</div>
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
                    {instruc1}
                    <p></p>
                    {execText1}
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
                <strong>Instrução LOAD/STORE com Registrador de Índice:</strong> <br />
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
                }}>{"010"}</span>
                <div style={{fontSize: '12px' }}>011</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={1} onValueChange={setP2} />
                <div style={{fontSize: '12px' }}>P</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={1} onValueChange={setU2} />
                <div style={{fontSize: '12px' }}>U</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '25px',
                }}>{"0"}</span>
                <div style={{fontSize: '12px' }}>B</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={1} onValueChange={setW2} />
                <div style={{fontSize: '12px' }}>W</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={1} onValueChange={setL2} />
                <div style={{fontSize: '12px' }}>L</div>
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
                <BinaryInput size={5} onValueChange={setShift} />
                <div style={{fontSize: '12px' }}>shift</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <BinaryInput size={2} onValueChange={setTipo} />
                <div style={{fontSize: '12px' }}>tipo</div>
                </div>
                <div style = {{display:'inline-block'}}>
                <span style={{
                    display: 'inline-block',
                    border: '1px solid #000',
                    padding: '5px 10px',
                    margin: '0px',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    minWidth: '25px',
                }}>{"0"}</span>
                <div style={{fontSize: '12px' }}>0</div>
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
                }}>{"Rm"}</span>
                <div style={{fontSize: '12px' }}>Rm</div>
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
                    {instruc2}
                    <p></p>
                    {execText2}
                    </div>
                </div>
            </p>


        </div>
    );

};


export default MemAccessComponent;