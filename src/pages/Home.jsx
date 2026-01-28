import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Home = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                // Fetch active polls
                const q = query(
                    collection(db, 'polls'),
                    where('isActive', '==', true),
                    orderBy('createdAt', 'desc')
                );
                const snapshot = await getDocs(q);
                setPolls(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                console.error("Error fetching polls:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPolls();
    }, []);

    return (
        <div className="max-w-2xl mx-auto text-center py-12">
            <h1 className="text-5xl font-heading font-bold text-gray-900 mb-6">
                Voice Your Opinion
            </h1>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                Participate in secure, anonymous polls.
                Select a poll below to cast your vote.
            </p>

            {loading ? (
                <div className="animate-pulse flex flex-col gap-4">
                    <div className="h-24 bg-gray-200 rounded-xl"></div>
                    <div className="h-24 bg-gray-200 rounded-xl"></div>
                </div>
            ) : polls.length > 0 ? (
                <div className="grid gap-4">
                    {polls.map(poll => (
                        <Link
                            key={poll.id}
                            to={`/poll/${poll.id}`}
                            className="block group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all text-left"
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-heading font-bold text-gray-900 group-hover:text-primary-600 mb-2">
                                    {poll.question}
                                </h3>
                                <div className="text-sm px-2 py-1 bg-gray-100 rounded text-gray-500 whitespace-nowrap">
                                    {poll.options.length} Options
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <span className="text-primary-500 font-medium group-hover:translate-x-1 transition-transform">
                                    Vote Now &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-400 italic">No active public polls at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
