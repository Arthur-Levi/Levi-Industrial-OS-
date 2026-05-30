// frontend/src/components/DashboardExec.jsx
import React from 'react';
import { useSocket } from '../context/SocketContext';
import MachineCard from './MachineCard';

export default function DashboardExec() {
    const { financials, fleetState, isContingency } = useSocket();

    return (
        <div style={{ backgroundColor: '#0A0A0C', color: '#E4E4E7', padding: '30px', fontFamily: 'monospace' }}>
            {isContingency && (
                <div style={{ backgroundColor: '#7F1D1D', color: '#FCA5A5', padding: '10px', textAlign: 'center', fontWeight: 'bold', borderRadius: '5px', marginBottom: '20px', border: '1px solid #EF4444' }}>
                    ⚠️ [ MODO DE CONTINGÊNCIA ATIVO ] ── EXIBINDO ÚLTIMOS DADOS CONSOLIDADOS.
                </div>
            )}
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <div style={{ borderLeft: '4px solid #10B981', backgroundColor: '#141416', padding: '20px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#71717A' }}>DINHEIRO SALVO HOJE</span>
                    <h1 style={{ fontSize: '2.5rem', color: '#10B981', margin: '5px 0 0 0', fontWeight: 'bold' }}>
                        R$ {financials?.totalSavedToday?.toLocaleString('pt-BR') || '0'}
                    </h1>
                </div>
                <div style={{ borderLeft: '4px solid #3B82F6', backgroundColor: '#141416', padding: '20px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#71717A' }}>STATUS DO SISTEMA</span>
                    <h1 style={{ fontSize: '2.5rem', color: '#3B82F6', margin: '5px 0 0 0', fontWeight: 'bold' }}>
                        RUFLO 2.0 CONNECTED
                    </h1>
                </div>
            </div>

            <h2 style={{ color: '#71717A', fontSize: '1.2rem', marginBottom: '20px' }}>🎛️ FROTA ESTRATÉGICA PLANTA 2 (11 MÁQUINAS)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {fleetState?.map((machine) => (
                    <MachineCard key={machine.id} machine={machine} />
                ))}
            </div>
        </div>
    );
}
