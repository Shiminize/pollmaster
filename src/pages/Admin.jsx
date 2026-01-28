import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { LoginForm } from '../features/auth/components/LoginForm';
import { PollCreationForm } from '../features/poll/components/PollCreationForm';
import { PollList } from '../features/poll/components/PollList';

const Admin = () => {
    const { user, login, logout } = useAuth();
    const [error, setError] = useState('');
    const [creating, setCreating] = useState(false);
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        if (!user) return;

        // Real-time listener for polls
        const q = query(collection(db, 'polls'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPolls(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, [user]);

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async (email, password) => {
        setIsLoggingIn(true);
        setError('');
        try {
            await login(email, password);
            // Error clearing is redundant but safe since we unmount on success
        } catch (err) {
            console.error("Login error:", err);
            let msg = 'Failed to login.';
            switch (err.code) {
                case 'auth/invalid-credential':
                    msg = 'Incorrect email or password.';
                    break;
                case 'auth/user-not-found':
                    msg = 'No admin account found with this email.';
                    break;
                case 'auth/wrong-password':
                    msg = 'Incorrect password. Please try again.';
                    break;
                case 'auth/too-many-requests':
                    msg = 'Too many failed attempts. Please try again later.';
                    break;
                default:
                    msg = 'Login failed. Please check your connection and credentials.';
            }
            setError(msg);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleCreatePoll = async ({ question, options }) => {
        const validOptions = options.filter(o => o.trim() !== '');
        if (validOptions.length < 2) {
            alert("Please provide at least two valid options.");
            return;
        }

        setCreating(true);
        try {
            await addDoc(collection(db, 'polls'), {
                question,
                options: validOptions.map(text => ({ text, voteCount: 0 })),
                createdAt: serverTimestamp(),
                isActive: true,
                createdBy: user.uid
            });
            alert('Poll Created!');
        } catch (err) {
            console.error("Error creating poll:", err);
            alert("Failed to create poll.");
        } finally {
            setCreating(false);
        }
    };

    if (!user) {
        return <LoginForm onLogin={handleLogin} error={error} isLoading={isLoggingIn} />;
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center border-b border-gray-100 pb-6">
                <h1 className="text-3xl font-heading font-bold text-primary-900">Manager Dashboard</h1>
                <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                    Logout
                </button>
            </div>

            <PollCreationForm onCreate={handleCreatePoll} isCreating={creating} />

            <section>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Your Polls</h2>
                <PollList polls={polls} />
            </section>
        </div>
    );
};

export default Admin;
