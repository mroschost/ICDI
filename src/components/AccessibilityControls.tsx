import React, { useState, useEffect } from 'react';
import { Type, Plus, Minus, RotateCcw } from 'lucide-react';

export const AccessibilityControls = () => {
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    // Load from local storage
    const savedSize = localStorage.getItem('font-size-scale');
    if (savedSize) {
      const size = parseInt(savedSize);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}%`;
    }
  }, []);

  const updateFontSize = (newSize: number) => {
    const clampedSize = Math.min(Math.max(newSize, 75), 150);
    setFontSize(clampedSize);
    
    // Apply to html and body for maximum compatibility
    document.documentElement.style.fontSize = `${clampedSize}%`;
    document.body.style.fontSize = '1rem'; // Ensure body is relative to scaled html
    
    localStorage.setItem('font-size-scale', clampedSize.toString());
  };

  const increase = () => updateFontSize(fontSize + 5);
  const decrease = () => updateFontSize(fontSize - 5);
  const reset = () => updateFontSize(100);

  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
      <div className="flex items-center gap-1.5 pr-2 border-r border-slate-200">
        <Type className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[0.625rem] font-black text-slate-500 uppercase tracking-tighter">
          {fontSize}%
        </span>
      </div>
      
      <div className="flex items-center gap-1">
        <button 
          onClick={decrease}
          className="p-1 hover:bg-white rounded transition-colors text-slate-600 hover:text-gov-blue-600"
          title="Diminuir fonte"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        
        <button 
          onClick={increase}
          className="p-1 hover:bg-white rounded transition-colors text-slate-600 hover:text-gov-blue-600"
          title="Aumentar fonte"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <button 
          onClick={reset}
          className="p-1 hover:bg-white rounded transition-colors text-slate-400 hover:text-red-500"
          title="Resetar"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
