import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../lib/firebase';

// Types
export interface DroneModel {
  id: string;
  name: string;
  nameUk: string;
  slug: string;
  order: number;
}

export interface ContentItem {
  id: string;
  droneId: string;
  type: 'photo' | 'video' | 'specification';
  title: string;
  titleUk: string;
  fileUrl: string;
  thumbnailUrl?: string;
  description?: string;
  descriptionUk?: string;
  order: number;
  createdAt: Date;
}

// Hook to fetch all drone models
export const useDroneModels = () => {
  const [models, setModels] = useState<DroneModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const q = query(collection(db, 'droneModels'), orderBy('order'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as DroneModel[];
        setModels(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch drone models');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return { models, loading, error };
};

// Hook to fetch content for a specific drone
export const useDroneContent = (droneId: string, type?: 'photo' | 'video' | 'specification') => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      if (!droneId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Simple query without orderBy to avoid index requirement
        // We'll sort client-side instead
        let q;
        if (type) {
          q = query(
            collection(db, 'content'),
            where('droneId', '==', droneId),
            where('type', '==', type)
          );
        } else {
          q = query(
            collection(db, 'content'),
            where('droneId', '==', droneId)
          );
        }

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        })) as ContentItem[];
        
        // Sort by order client-side
        data.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        setContent(data);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [droneId, type, refreshCounter]);

  const refetch = () => {
    setRefreshCounter(prev => prev + 1);
  };

  return { content, loading, error, refetch };
};

// Function to upload file to Firebase Storage
export const uploadFile = async (
  file: File, 
  path: string
): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Function to delete file from Firebase Storage
export const deleteFile = async (fileUrl: string): Promise<void> => {
  try {
    const storageRef = ref(storage, fileUrl);
    await deleteObject(storageRef);
  } catch (err) {
    console.error('Error deleting file:', err);
  }
};

// Function to add content item
export const addContentItem = async (
  item: Omit<ContentItem, 'id' | 'createdAt'>
): Promise<string> => {
  const docRef = await addDoc(collection(db, 'content'), {
    ...item,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

// Function to update content item
export const updateContentItem = async (
  id: string, 
  updates: Partial<ContentItem>
): Promise<void> => {
  const docRef = doc(db, 'content', id);
  await updateDoc(docRef, updates);
};

// Function to delete content item
export const deleteContentItem = async (id: string): Promise<void> => {
  const docRef = doc(db, 'content', id);
  await deleteDoc(docRef);
};

// Function to add drone model
export const addDroneModel = async (
  model: Omit<DroneModel, 'id'>
): Promise<string> => {
  const docRef = await addDoc(collection(db, 'droneModels'), model);
  return docRef.id;
};

// Function to update drone model
export const updateDroneModel = async (
  id: string, 
  updates: Partial<DroneModel>
): Promise<void> => {
  const docRef = doc(db, 'droneModels', id);
  await updateDoc(docRef, updates);
};

// Function to delete drone model
export const deleteDroneModel = async (id: string): Promise<void> => {
  const docRef = doc(db, 'droneModels', id);
  await deleteDoc(docRef);
};
