import { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, set, onValue } from 'firebase/database';

function useFirebaseStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataRef = ref(database, key);
    
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setStoredValue(data || initialValue);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [key, initialValue]);

  const setValue = async (value) => {
    try {
      await set(ref(database, key), value);
      setStoredValue(value);
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    }
  };

  return [storedValue, setValue, loading];
}

export default useFirebaseStorage;
