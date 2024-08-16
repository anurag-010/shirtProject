import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame(({ camera, pointer }, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    let targetPosition = [-0.4, 0, 2.5];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // Apply smooth position transition to the camera
    easing.damp3(camera.position, targetPosition, 0.25, delta);

    // Reset rotation to default before applying new rotation
    if (group.current) {
      group.current.rotation.set(0, 0, 0); // Reset rotation to prevent unintended tilting
      easing.dampE(
        group.current.rotation,
        [pointer.y / 10, -pointer.x / 5, 0], // Apply pointer-based rotation
        0.25,
        delta
      );
    }
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
