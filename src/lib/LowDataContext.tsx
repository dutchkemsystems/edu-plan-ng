import React, { createContext, useContext, useState, useEffect } from 'react';

interface LowDataContextType {
  isLowDataMode: boolean;
  toggleLowDataMode: () => void;
  setLowDataMode: (enabled: boolean) => void;
  dataSavingsEstimateKb: number;
}

const LowDataContext = createContext<LowDataContextType>({
  isLowDataMode: false,
  toggleLowDataMode: () => {},
  setLowDataMode: () => {},
  dataSavingsEstimateKb: 0,
});

export const LowDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLowDataMode, setIsLowDataModeState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('eduplan_low_data_mode');
      if (stored !== null) {
        return stored === 'true';
      }
      // Check NetworkInformation API if available (saveData flag or 2g/3g)
      const conn = (navigator as any)?.connection;
      if (conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')) {
        return true;
      }
    }
    return false;
  });

  const [dataSavingsEstimateKb, setDataSavingsEstimateKb] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('eduplan_saved_data_kb');
      return saved ? parseInt(saved, 10) : 1420;
    }
    return 1420;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('eduplan_low_data_mode', String(isLowDataMode));
      if (isLowDataMode) {
        document.documentElement.classList.add('low-data-mode');
        // Increment estimated savings on session
        setDataSavingsEstimateKb((prev) => {
          const next = prev + 180;
          localStorage.setItem('eduplan_saved_data_kb', String(next));
          return next;
        });
      } else {
        document.documentElement.classList.remove('low-data-mode');
      }
    }
  }, [isLowDataMode]);

  const toggleLowDataMode = () => {
    setIsLowDataModeState((prev) => !prev);
  };

  const setLowDataMode = (enabled: boolean) => {
    setIsLowDataModeState(enabled);
  };

  return (
    <LowDataContext.Provider
      value={{
        isLowDataMode,
        toggleLowDataMode,
        setLowDataMode,
        dataSavingsEstimateKb,
      }}
    >
      {children}
    </LowDataContext.Provider>
  );
};

export const useLowDataMode = () => useContext(LowDataContext);
