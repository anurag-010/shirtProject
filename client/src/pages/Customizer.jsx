import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { EditorTabs, FilterTabs } from '../config/constants'; // Import FilterTabs
import { fadeAnimation, slideAnimation } from '../config/motion';
import Tab from '../components/Tab'; // Corrected import for Tab component
import CustomButton from '../components/CustomButton'; // Corrected import for CustomButton

const Customizer = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div 
            key="custom"
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    handleClick={() => {
                      // Handle click event
                    }}
                    tab={tab}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className='absolute z-10 top-5 right-5' 
            {...fadeAnimation} // Removed trailing colon ":" causing a syntax error
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab 
                key={tab.name}
                handleClick={() => {
              
                }}
                tab={tab}
                isFilterTab
                isActiveTab="" 
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
