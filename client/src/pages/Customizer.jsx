import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'; 
import { fadeAnimation, slideAnimation } from '../config/motion';
import Tab from '../components/Tab'; 
import CustomButton from '../components/CustomButton'; 
import { logoShirt, stylishShirt } from '../assets';
import ColorPicker from '../components/ColorPicker';
import FilePicker from '../components/FilePicker';
import AiPicker from '../components/AiPicker';

const Customizer = () => {
  const snap = useSnapshot(state);
  
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState('logoShirt');

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return (
          <FilePicker 
            file={file}
            setFile={setFile}
            readFile= {readFile}
          />
        );
      case 'aipicker':
        return <AiPicker  
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}
        />;
      default:
        return null;
    }
  };

  const handleSubmit = async(type)=>{
    if(!prompt) return alert("Please enter a prompt")
      try{
    }
    catch(error){
      alert(error)
    }finally{
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }
    setActiveFilterTab((prevState)=>{
     return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  };

  const readFile = (type) => {
    const reader = new FileReader();
    reader.onload = () => {
      handleDecals(type, reader.result);
      setActiveEditorTab('');
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div 
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    handleClick={() => setActiveEditorTab(tab.name)}
                    tab={tab}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab 
                key={tab.name}
                handleClick={() => handleActiveFilterTab(tab.name)}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab === tab.name}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
