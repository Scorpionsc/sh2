import {useCallback, useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';

interface UseAppStateProps {
  onActivate: () => void;
}

const useAppStateChange: (props: UseAppStateProps) => void = ({onActivate}) => {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        onActivate();
      }

      appState.current = nextAppState;
    },
    [onActivate],
  );

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);
};

export default useAppStateChange;
