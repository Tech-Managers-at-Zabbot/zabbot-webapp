/* eslint-disable @typescript-eslint/no-explicit-any */
// services/cronService.ts
interface ProgressSyncData {
  lessonId: string;
  courseId: string;
  contentIndex: number;
  quizIndex: number;
  step: string;
  contentId?: string;
  languageId: string;
  userCourse: any;
  timestamp: string;
}

let intervalId: NodeJS.Timeout | null = null;
let isRunning = false;
let syncCallback: ((data: ProgressSyncData[]) => Promise<void>) | null = null;

const SYNC_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
const STORAGE_KEY = 'pending_progress_sync';
const LAST_SYNC_KEY = 'last_progress_sync';

/**
 * Get all pending sync data
 */
const getPendingSyncs = (): ProgressSyncData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading pending syncs:', error);
    return [];
  }
};

/**
 * Execute the sync job
 */
const executeSyncJob = async (): Promise<void> => {
  const pendingData = getPendingSyncs();
  
  if (pendingData.length === 0) {
    console.log('No pending progress to sync');
    return;
  }

  if (!syncCallback) {
    console.warn('No sync callback provided');
    return;
  }

  try {
    console.log(`Syncing ${pendingData.length} progress entries...`);
    
    await syncCallback(pendingData);
    
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
    
    console.log('Progress sync completed successfully');
  } catch (error) {
    console.error('Error during progress sync:', error);
  }
};

/**
 * Setup page visibility listener to sync when page becomes visible
 */
const setupVisibilityListener = (): void => {
  if (typeof document === 'undefined') return;

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && getPendingSyncs().length > 0) {
      const lastSync = localStorage.getItem(LAST_SYNC_KEY);
      
      if (lastSync) {
        const lastSyncTime = new Date(lastSync).getTime();
        const now = Date.now();
        const timeSinceLastSync = now - lastSyncTime;
        
        // If it's been more than 1 hour since last sync, sync now
        if (timeSinceLastSync >= 60 * 60 * 1000) {
          console.log('Page became visible, syncing progress...');
          setTimeout(() => executeSyncJob(), 500);
        }
      }
    }
  });
};

/**
 * Check for pending syncs on initialization
 */
const checkPendingSyncs = (): void => {
  const pendingData = getPendingSyncs();
  const lastSync = localStorage.getItem(LAST_SYNC_KEY);
  
  if (pendingData.length > 0) {
    console.log(`Found ${pendingData.length} pending progress syncs`);
    
    // If last sync was more than 2 hours ago, sync immediately
    if (lastSync) {
      const lastSyncTime = new Date(lastSync).getTime();
      const now = Date.now();
      const timeSinceLastSync = now - lastSyncTime;
      
      if (timeSinceLastSync >= SYNC_INTERVAL) {
        console.log('Last sync was over 2 hours ago, syncing now...');
        setTimeout(() => executeSyncJob(), 1000); // Small delay to allow initialization
      }
    } else {
      // No previous sync record, sync now
      setTimeout(() => executeSyncJob(), 1000);
    }
  }
};

/**
 * Initialize the cron service
 */
export const initCronService = (callback: (data: ProgressSyncData[]) => Promise<void>): void => {
  syncCallback = callback;
  setupVisibilityListener();
  checkPendingSyncs();
  startCronService();
};

/**
 * Start the cron job
 */
export const startCronService = (): void => {
  if (isRunning) return;

  isRunning = true;
  intervalId = setInterval(() => {
    executeSyncJob();
  }, SYNC_INTERVAL);

  console.log('Progress sync cron job started - runs every 2 hours');
};

/**
 * Stop the cron job
 */
export const stopCronService = (): void => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  isRunning = false;
  console.log('Progress sync cron job stopped');
};

/**
 * Add progress data to sync queue
 */
export const queueProgressSync = (data: ProgressSyncData): void => {
  try {
    const existingData = getPendingSyncs();
    
    // Remove existing entry for the same lesson to avoid duplicates
    const filteredData = existingData.filter(
      item => !(item.lessonId === data.lessonId && item.courseId === data.courseId)
    );
    
    // Add new data
    filteredData.push(data);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));
    console.log('Progress queued for sync:', data.lessonId);
  } catch (error) {
    console.error('Error queuing progress sync:', error);
  }
};

/**
 * Force sync immediately
 */
export const forceSyncNow = async (): Promise<boolean> => {
  try {
    await executeSyncJob();
    return true;
  } catch (error) {
    console.error('Force sync failed:', error);
    return false;
  }
};

/**
 * Setup beforeunload listener to attempt final sync
 */
export const setupBeforeUnloadSync = (): void => {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeunload', () => {
    const pendingData = getPendingSyncs();
    if (pendingData.length > 0 && syncCallback) {
      try {
        const data = JSON.stringify(pendingData);
        // You would need to create an endpoint that accepts this data
        navigator.sendBeacon('/api/sync-progress', data);
      } catch (error) {
        console.error('Error sending beacon:', error);
      }
    }
  });
};

/**
 * Get sync status information
 */
export const getSyncStatus = () => {
  const pendingCount = getPendingSyncs().length;
  const lastSync = localStorage.getItem(LAST_SYNC_KEY);
  
  return {
    isRunning,
    pendingCount,
    lastSync: lastSync ? new Date(lastSync) : null,
    nextSync: isRunning ? new Date(Date.now() + SYNC_INTERVAL) : null
  };
};