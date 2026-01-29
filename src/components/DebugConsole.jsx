import React, { useState, useEffect } from 'react';

export const DebugConsole = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const originalLog = console.log;
        const originalError = console.error;

        console.log = (...args) => {
            setLogs(prev => [...prev.slice(-10), `[LOG] ${args.join(' ')}`]);
            originalLog(...args);
        };
        console.error = (...args) => {
            setLogs(prev => [...prev.slice(-10), `[ERR] ${args.join(' ')}`]);
            originalError(...args);
        };

        return () => {
            console.log = originalLog;
            console.error = originalError;
        };
    }, []);

    if (logs.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black/90 text-green-400 font-mono text-xs p-4 h-48 overflow-y-auto z-50 border-t border-gray-700">
            <h3 className="font-bold text-white mb-2 sticky top-0 bg-gray-900 p-1">DEBUG CONSOLE (Take Screenshot)</h3>
            {logs.map((log, i) => (
                <div key={i} className="border-b border-gray-800 py-1">{log}</div>
            ))}
        </div>
    );
};
