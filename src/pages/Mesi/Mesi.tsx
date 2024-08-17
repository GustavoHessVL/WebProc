import React, { useState } from "react";
import "./Style.css";
import ReadContainer from "./ReadContainer";
import { write } from "fs";

type MemoryPosition = {
  cache1State: string;
  cache2State: string;
  value: number
};


type Memory = {
  [address: string]: MemoryPosition;
};


const Mesi: React.FC = () => {

  const initialCache1: { [key: string]: { value: any } } = {};
  const initialCache2: { [key: string]: { value: any } } = {};

  initialCache1["0x00"] = { value: null};
  initialCache1["0x04"] = { value: null};
  initialCache1["0x08"] = { value: null};
  initialCache1["0x0C"] = { value: null};

  initialCache2["0x00"] = { value: null};
  initialCache2["0x04"] = { value: null};
  initialCache2["0x08"] = { value: null};
  initialCache2["0x0C"] = { value: null};

  const initialMemory: Memory = {
    "0x00": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x04": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x08": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x0C": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x10": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x14": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x18": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x1C": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x20": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x24": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x28": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
    "0x2C": { cache1State: "Invalid", cache2State: "Invalid", value: 0 },
  };


  const [memory, setMemory] = useState<Memory>(initialMemory);
  const [cache1, setCache1] = useState<{ [key: string]: { value: any } }>(initialCache1);
  const [cache2, setCache2] = useState<{ [key: string]: { value: any } }>(initialCache2);
  const [inputValue, setInputValue] = useState("");
  const [selectedProcessor, setSelectedProcessor] = useState<1 | 2>(1);
  const [selectedAddress, setSelectedAddress] = useState("0x00");

  const handleAddressChange = (address: string) => {
    setSelectedAddress(address);
  };

  const handleProcessorChange = (processor: 1 | 2) => {
    setSelectedProcessor(processor);
  };

  const handleInputChange = (input: string) => {
    setInputValue(String(input));
  }

  const writeBackValue = (address: string, newValue: number) => {
    setMemory((prevMemory) => {
      const updatedMemory = { ...prevMemory };
      updatedMemory[address].value = newValue;
      return updatedMemory;
    });
  };


  const invalidateOtherAddresses = (address: string, cacheNumber: 1 | 2) => {
    const lastDigit = address.slice(-1);

    Object.keys(memory).forEach((key) => {
      if (key !== address && key.endsWith(lastDigit)) {
        if (cacheNumber === 1) {
          if(memory[key].cache2State === "Modified"){
            writeBackValue(key, cache1[key].value);
          }
          memory[key].cache1State = "Invalid";
        } 
        else if (cacheNumber === 2) {
          if(memory[key].cache1State === "Modified"){
            writeBackValue(key, cache1[key].value);
          }
          memory[key].cache2State = "Invalid";
        }
      }
    });
  }


  const updateCacheState = (address: string, cacheNumber: 1 | 2, newState: string) => {
    setMemory((prevMemory) => {
      const updatedMemory = { ...prevMemory };
      if (cacheNumber === 1) {
        updatedMemory[address].cache1State = newState;
      } 
      else if (cacheNumber === 2) {
        updatedMemory[address].cache2State = newState;
      }
      return updatedMemory;
    });
  };

  const updateCacheValue = (address: string, cacheNumber: 1 | 2, newValue: number) => {
    if (cacheNumber === 1) {
      setCache1((prevCache) => {
        const updatedCache = { ...prevCache };
        updatedCache[address].value = newValue;
        return updatedCache;
      });
    } else if (cacheNumber === 2) {
      setCache2((prevCache) => {
        const updatedCache = { ...prevCache };
        updatedCache[address].value = newValue;
        return updatedCache;
      });
    }
  };


  const handleWrite = () => {
    //WRITE OP
    if (selectedProcessor === 1){
        if(memory[selectedAddress].cache1State === "Invalid"){
          //INVALIDA CACHE PRESENTE
          invalidateOtherAddresses(selectedAddress, selectedProcessor);

          if(memory[selectedAddress].cache2State === "Invalid"){
            updateCacheState(selectedAddress, selectedProcessor, "Modified");
          }
          else if(memory[selectedAddress].cache2State === "Exclusive"){
            updateCacheState(selectedAddress, 2, "Invalid");
            updateCacheState(selectedAddress, selectedProcessor, "Modified");
          }
          else if(memory[selectedAddress].cache2State === "Shared"){
            updateCacheState(selectedAddress, 2, "Invalid");
            updateCacheState(selectedAddress, selectedProcessor, "Modified");
          }
          else if(memory[selectedAddress].cache2State === "Modified"){
            //WRITEBACK cache 2
            writeBackValue(selectedAddress, cache2[selectedAddress].value);
            updateCacheState(selectedAddress, 2, "Invalid");
            updateCacheState(selectedAddress, selectedProcessor, "Modified");
          }

        }
        else if(memory[selectedAddress].cache1State === "Exclusive"){
            updateCacheState(selectedAddress, selectedProcessor, "Modified");
        }
        else if(memory[selectedAddress].cache1State === "Shared"){
            updateCacheState(selectedAddress, 2, "Invalid");
            updateCacheState(selectedAddress, selectedProcessor, "Modified");
        }
        else if(memory[selectedAddress].cache1State === "Modified"){
            //NOTHING HAPPENS
        }
        updateCacheValue(selectedAddress, selectedProcessor, Number(inputValue));

    }
    else if (selectedProcessor === 2){
      if(memory[selectedAddress].cache2State === "Invalid"){
        //INVALIDA CACHE PRESENTE
        invalidateOtherAddresses(selectedAddress, selectedProcessor);

        if(memory[selectedAddress].cache1State === "Invalid"){
          updateCacheState(selectedAddress, selectedProcessor, "Modified");
        }
        else if(memory[selectedAddress].cache1State === "Exclusive"){
          updateCacheState(selectedAddress, 1, "Invalid");
          updateCacheState(selectedAddress, selectedProcessor, "Modified");
        }
        else if(memory[selectedAddress].cache1State === "Shared"){
          updateCacheState(selectedAddress, 1, "Invalid");
          updateCacheState(selectedAddress, selectedProcessor, "Modified");
        }
        else if(memory[selectedAddress].cache1State === "Modified"){
          //WRITEBACK cache 1
          writeBackValue(selectedAddress, cache1[selectedAddress].value);
          updateCacheState(selectedAddress, 1, "Invalid");
          updateCacheState(selectedAddress, selectedProcessor, "Modified");
        }

      }
      else if(memory[selectedAddress].cache2State === "Exclusive"){
          updateCacheState(selectedAddress, selectedProcessor, "Modified");
      }
      else if(memory[selectedAddress].cache2State === "Shared"){
          updateCacheState(selectedAddress, 1, "Invalid");
          updateCacheState(selectedAddress, selectedProcessor, "Modified");
      }
      else if(memory[selectedAddress].cache2State === "Modified"){
          //NOTHING HAPPENS
      }
      updateCacheValue(selectedAddress, selectedProcessor, Number(inputValue));
    }
  };


  const handleRead = () => {
    //READ OP

    if (selectedProcessor === 1) {
        if(memory[selectedAddress].cache1State === "Invalid") {
          //SALVA BLOCO PREEXISTENTE
          invalidateOtherAddresses(selectedAddress, selectedProcessor);

          if(memory[selectedAddress].cache2State === "Invalid") {
            updateCacheState(selectedAddress, selectedProcessor, "Exclusive");
          }

          else if(memory[selectedAddress].cache2State === "Exclusive") {
            updateCacheState(selectedAddress, 2, "Shared");
            updateCacheState(selectedAddress, selectedProcessor, "Shared");
          }

          else if(memory[selectedAddress].cache2State === "Shared") {
            updateCacheState(selectedAddress, 2, "Shared");
            updateCacheState(selectedAddress, selectedProcessor, "Shared");
          }

          else if(memory[selectedAddress].cache2State === "Modified") {
            //WRITEBACK
            writeBackValue(selectedAddress, cache2[selectedAddress].value);
            updateCacheState(selectedAddress, 2, "Shared");
            updateCacheState(selectedAddress, selectedProcessor, "Shared");
          }
          setTimeout(() => updateCacheValue(selectedAddress, selectedProcessor, memory[selectedAddress].value), 2);
        
        }
        else if(memory[selectedAddress].cache1State === "Exclusive") {
            //NOTHING HAPPENS
        }

        else if(memory[selectedAddress].cache1State === "Shared") {
            //NOTHING HAPPENS
        }

        else if(memory[selectedAddress].cache1State === "Modified") {
            //NOTHING HAPPENS
        }
    }
    else if (selectedProcessor === 2) {
      if(memory[selectedAddress].cache2State === "Invalid") {
        //SALVA BLOCO PREEXISTENTE
        invalidateOtherAddresses(selectedAddress, selectedProcessor);

        if(memory[selectedAddress].cache1State === "Invalid") {
          updateCacheState(selectedAddress, selectedProcessor, "Exclusive");
        }

        else if(memory[selectedAddress].cache1State === "Exclusive") {
          updateCacheState(selectedAddress, 1, "Shared");
          updateCacheState(selectedAddress, selectedProcessor, "Shared");
        }

        else if(memory[selectedAddress].cache1State === "Shared") {
          updateCacheState(selectedAddress, 1, "Shared");
          updateCacheState(selectedAddress, selectedProcessor, "Shared");
        }

        else if(memory[selectedAddress].cache1State === "Modified") {
          //WRITEBACK
          writeBackValue(selectedAddress, cache1[selectedAddress].value);
          updateCacheState(selectedAddress, 1, "Shared");
          updateCacheState(selectedAddress, selectedProcessor, "Shared");
        }
        setTimeout(() => updateCacheValue(selectedAddress, selectedProcessor, memory[selectedAddress].value), 2);
      
      }
      else if(memory[selectedAddress].cache2State === "Exclusive") {
          //NOTHING HAPPENS
      }

      else if(memory[selectedAddress].cache2State === "Shared") {
          //NOTHING HAPPENS
      }

      else if(memory[selectedAddress].cache2State === "Modified") {
          //NOTHING HAPPENS
      }
    }

  };

  return (
    
    <div className="main-container">
      <div className="dataContainer">
      <ReadContainer 
        memory={memory}
        selectedAddress={selectedAddress}
        selectedProcessor={selectedProcessor}
        onAddressChange={handleAddressChange}
        onProcessorChange={handleProcessorChange}
        onInputChange={handleInputChange}
        onWrite={handleWrite}
        onRead={handleRead}
      />
    </div>
      <div className="cache-container">
        <div className="cache">
          {Object.keys(cache1).map((key) => (
            <div key={key} className="memory-row">
              <div className="memory-position">
                <span>Value: {String(cache1[key].value)}</span>
              </div>
              <div className="memory-address">
                <span>{key}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="cache">
          {Object.keys(cache2).map((key) => (
            <div key={key} className="memory-row">
              <div className="memory-position">
                <span>Value: {String(cache2[key].value)}</span>
              </div>
              <div className="memory-address">
                <span>{key}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="memory-container">
        {Object.keys(memory).map((address) => (
          <div key={address} className="memory-row">
            <div className="memory-position">
              <span>Cache 1 State: {memory[address].cache1State} | Cache 2 State: {memory[address].cache2State} | Value: {memory[address].value}</span>
            </div>
            <div className="memory-address">
              <span>{address}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mesi;
