import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
        presetColors={[
          '#FF5733', // Vivid Orange
          '#33FF57', // Bright Green
          '#3357FF', // Bold Blue
          '#FF33A1', // Pink
          '#F1C40F', // Yellow
          '#2ECC71', // Emerald Green
          '#E74C3C', // Red
          '#9B59B6', // Purple
          '#1ABC9C', // Turquoise
          '#34495E', // Dark Blue
          '#F39C12', // Orange
          '#95A5A6', // Gray
        ]}
      />
    </div>
  );
};

export default ColorPicker;
