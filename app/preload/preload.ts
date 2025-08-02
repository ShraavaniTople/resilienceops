import { contextBridge } from 'electron';
contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => 'PONG ✅'
});
