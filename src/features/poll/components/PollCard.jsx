import React from 'react';

export const PollCard = ({ poll, hasVoted, selectedOption, onVote, isVoting }) => {
    const totalVotes = poll.options.reduce((acc, o) => acc + o.voteCount, 0);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-500"></div>

            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold tracking-wider rounded-full mb-4">
                {poll.isActive ? 'LIVE POLL' : 'CLOSED'}
            </span>

            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                {poll.question}
            </h2>

            <div className="space-y-3">
                {poll.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => onVote(idx)}
                        disabled={hasVoted || isVoting}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden
              ${hasVoted && selectedOption === idx
                                ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                                : 'border-gray-200 hover:border-primary-400 hover:bg-gray-50'
                            }
              ${(hasVoted || isVoting) ? 'cursor-default' : 'cursor-pointer'}
            `}
                    >
                        <div className="relative z-10 flex justify-between items-center">
                            <span className={`font-medium ${hasVoted && selectedOption === idx ? 'text-primary-800' : 'text-gray-700'}`}>
                                {opt.text}
                            </span>
                            {hasVoted && (
                                <span className="text-sm font-bold text-primary-600">
                                    {opt.voteCount} votes
                                </span>
                            )}
                        </div>

                        {/* Simple progress bar background if voted */}
                        {hasVoted && totalVotes > 0 && (
                            <div
                                className="absolute left-0 top-0 bottom-0 bg-primary-100/50 transition-all duration-1000"
                                style={{ width: `${(opt.voteCount / totalVotes) * 100}%` }}
                            ></div>
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500">
                <span>{hasVoted ? 'Thanks for voting!' : 'Select an option to vote'}</span>
                <span>Poll ID: {poll.id.slice(0, 6)}...</span>
            </div>
        </div>
    );
};
