import React from "react";
import { useState } from "react";
import "./Style.css";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import MemorySystem from "../../components/MemorySystem/MemorySystem";
import ToggleButton4 from "../../components/CPSRToggle/CPSRToggle";
import BranchComponent from "../../components/BranchComponent/BranchComponent";
import ArmEmulator from "../../components/MovComponent/MovComponent";

const Theory1 =
  "Lorem ipsum dolor sit amet. Eum autem aliquam et eligendi numquam eos  magnam dolorum sit placeat porro ut doloremque explicabo non molestiae  facilis. Sit nulla placeat et rerum necessitatibus aut dolorem  voluptatibus et perferendis pariatur. Aut animi vitae et quibusdam  galisum ab iusto labore. Et sunt galisum qui laboriosam porro nam  officia aliquam ab impedit soluta.";

/* Do a button that switches between 0 and 1*/

const Instructions: React.FC = () => {
  return (
    <div className="container">
      <h1>WebProc Project</h1>
      <p>Interactive Learning System</p>
      <div className="section">
        {" "}
        //Sessão 2
        <div className="TitleDiv">
          <h2 className="section-title">Title 1</h2>
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
          {/* <div>
            <ToggleButton />
          </div>
          <div>
            <ToggleButton />
          </div> */}
        </div>
        <div className="Theory">{Theory1}</div>
      </div>
      <div className="section">
        {" "}
        //Sessão 2
        <div className="TitleDiv">
          <h2 className="section-title">Load / Store</h2>
        </div>
        <div className="ContentDiv">
          {/* Content for the second block */}

          <div className="Theory">{"As intruções Load / Store"}</div>
          <div className="block">
            <div>
              <MemorySystem />
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        {" "}
        //Sessão 2
        <div className="TitleDiv">
          <h2 className="section-title">Title 3</h2>
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
        //Sessão 2
        <div className="TitleDiv">
          <h2 className="section-title">Title 4</h2>
        </div>
        <div className="ContentDiv">
          {/* Content for the second block */}
          <div className="Theory">{/* Content for the second block */}</div>
          <div className="block">{
          }
          <div>
            <ArmEmulator/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
