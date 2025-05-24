import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

// Create LoadingContext with proper type
const LoadingContext = createContext<LoadingContextType | null>(null);

// LoadingProvider component with proper children type
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
      {loading && (
        <div style={styles.backdrop}>
          <div style={styles.spinnerContainer}>
            <div style={styles.spinner} />
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

// Custom hook with proper type checking
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
const styles: any = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerContainer: {
    background: '#fff',
    padding: '1rem 2rem',
    borderRadius: '8px',
  },
  spinner: {
    width: '30px',
    height: '30px',
    border: '4px solid #ccc',
    borderTop: '4px solid #000',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};
