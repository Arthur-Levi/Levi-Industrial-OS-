// hooks/useIndustrialSocket.js
// Central WebSocket connection — single source of truth for all live data

import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

// In Codespaces, Vite proxies /socket.io → backend automatically.
// Locally, connects direct to localhost:3001.
const SOCKET_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? window.location.origin   // Codespace: same origin, Vite proxies to backend
  : 'http://localhost:3001'; // Local dev: direct connection

const initialState = {
  connected: false,
  machines: [],
  alarms: [],
  metrics: null,
  events: [],
  plantOEE: null,
  lastUpdate: null,
  error: null,
};

export function useIndustrialSocket() {
  const [state, setState] = useState(initialState);
  const socketRef = useRef(null);

  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates, lastUpdate: new Date().toISOString() }));
  }, []);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
      timeout: 10000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[Socket] Connected:', socket.id);
      updateState({ connected: true, error: null });
    });

    socket.on('disconnect', (reason) => {
      console.warn('[Socket] Disconnected:', reason);
      updateState({ connected: false });
    });

    socket.on('connect_error', (err) => {
      console.error('[Socket] Connection error:', err.message);
      updateState({ connected: false, error: err.message });
    });

    socket.on('init', (data) => {
      updateState({
        machines: data.machines || [],
        alarms: data.alarms || [],
        metrics: data.metrics || null,
        events: data.events || [],
      });
    });

    socket.on('telemetry:update', (data) => {
      setState(prev => {
        const machineMap = new Map(prev.machines.map(m => [m.id, m]));
        (data.machines || []).forEach(m => machineMap.set(m.id, m));
        return {
          ...prev,
          machines: Array.from(machineMap.values()),
          metrics: data.metrics || prev.metrics,
          lastUpdate: data.ts,
        };
      });
    });

    socket.on('oee:update', (data) => {
      setState(prev => {
        const oeeMap = new Map((data.machines || []).map(m => [m.id, m.oee]));
        const machines = prev.machines.map(m =>
          oeeMap.has(m.id) ? { ...m, oee: oeeMap.get(m.id) } : m
        );
        return { ...prev, machines, plantOEE: data.plant || prev.plantOEE };
      });
    });

    socket.on('alarm:new', (alarm) => {
      setState(prev => ({
        ...prev,
        alarms: [alarm, ...prev.alarms.filter(a => a.id !== alarm.id)],
      }));
    });

    socket.on('alarm:acknowledged', (alarm) => {
      setState(prev => ({
        ...prev,
        alarms: prev.alarms.map(a => a.id === alarm.id ? alarm : a),
      }));
    });

    socket.on('alarm:resolved', (alarm) => {
      setState(prev => ({
        ...prev,
        alarms: prev.alarms.filter(a => a.id !== alarm.id),
      }));
    });

    return () => { socket.disconnect(); };
  }, [updateState]);

  const acknowledgeAlarm = useCallback((alarmId, operatorName = 'Operador') => {
    socketRef.current?.emit('alarm:acknowledge', { alarmId, operatorName });
  }, []);

  const resolveAlarm = useCallback((alarmId) => {
    socketRef.current?.emit('alarm:resolve', { alarmId });
  }, []);

  const requestMachineHistory = useCallback((machineId) => {
    socketRef.current?.emit('machine:requestHistory', { machineId });
  }, []);

  return { ...state, acknowledgeAlarm, resolveAlarm, requestMachineHistory };
}