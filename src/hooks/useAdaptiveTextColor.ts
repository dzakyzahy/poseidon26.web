import { useState, useEffect } from 'react';

// This hook takes a progress value (0 to 1) and returns a suitable text color
// based on a predefined mapping of progress to background luminance.
// This is more performant and predictable than mix-blend-mode or real-time pixel sampling.
export function useAdaptiveTextColor(progress: number) {
  const [colorClass, setColorClass] = useState('text-white');

  useEffect(() => {
    // Let's assume we know the background is dark at progress 0-0.3 (deep ocean)
    // Then it gets brighter at 0.3-0.6 (shallower water/sky)
    // Then dark again at 0.6-1.0
    // We map progress to background luminance conceptually.
    
    // Thresholds:
    // 0.0 - 0.3: Dark background -> White text
    // 0.3 - 0.6: Bright background -> Dark text
    // 0.6 - 1.0: Dark background -> White text
    
    if (progress > 0.3 && progress < 0.6) {
      setColorClass('text-ocean-900'); // Dark text
    } else {
      setColorClass('text-white'); // Light text
    }
  }, [progress]);

  return colorClass;
}
