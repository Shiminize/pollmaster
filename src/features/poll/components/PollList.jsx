import React from 'react';
import { Link } from 'react-router-dom';

export const PollList = ({ polls }) => {
    if (polls.length === 0) {
        return <p className="text-gray-400 italic">No polls created yet.</p>;
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {polls.map(poll => (
                <div key={poll.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="font-heading font-bold text-lg mb-2">{poll.question}</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Created: {poll.createdAt?.toDate().toLocaleDateString()}
                    </p>
                    <div className="space-y-2 mb-6">
                        {poll.options.map((opt, i) => (
                            <div key={i} className="flex justify-between text-sm">
                                <span className="text-gray-700">{opt.text}</span>
                                <span className="font-medium text-primary-600">{opt.voteCount} votes</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center">
                        <Link to={`/poll/${poll.id}`} className="text-primary-600 font-medium hover:underline text-sm">
                            View Live Page &rarr;
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};
