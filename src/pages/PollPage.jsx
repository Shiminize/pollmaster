import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import { PollCard } from '../features/poll/components/PollCard';

const PollPage = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        let voterId = localStorage.getItem('poll_voter_id');
        if (!voterId) {
            voterId = uuidv4();
            localStorage.setItem('poll_voter_id', voterId);
        }

        const votedPolls = JSON.parse(localStorage.getItem('voted_polls') || '[]');
        if (votedPolls.includes(id)) {
            setHasVoted(true);
        }

        const fetchPoll = async () => {
            try {
                const docRef = doc(db, 'polls', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPoll({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setPoll(null);
                }
            } catch (err) {
                console.error("Error fetching poll:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPoll();
    }, [id]);

    const handleVote = async (optionIndex) => {
        if (hasVoted) return;
        setVoting(true);
        setSelectedOption(optionIndex);

        try {
            const voterId = localStorage.getItem('poll_voter_id');
            const pollRef = doc(db, 'polls', id);

            const newOptions = [...poll.options];
            newOptions[optionIndex].voteCount = (newOptions[optionIndex].voteCount || 0) + 1;

            await updateDoc(pollRef, {
                options: newOptions
            });

            await addDoc(collection(db, 'votes'), {
                pollId: id,
                optionIndex: optionIndex,
                optionText: poll.options[optionIndex].text,
                voterId: voterId,
                voterAgent: navigator.userAgent,
                timestamp: serverTimestamp()
            });

            const votedPolls = JSON.parse(localStorage.getItem('voted_polls') || '[]');
            votedPolls.push(id);
            localStorage.setItem('voted_polls', JSON.stringify(votedPolls));

            setHasVoted(true);
            setPoll(prev => ({ ...prev, options: newOptions }));

        } catch (err) {
            console.error("Error voting:", err);
            alert("Something went wrong while voting. Please try again.");
        } finally {
            setVoting(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading poll...</div>;
    if (!poll) return <div className="text-center py-20">Poll not found.</div>;

    return (
        <div className="max-w-xl mx-auto">
            <PollCard
                poll={poll}
                hasVoted={hasVoted}
                selectedOption={selectedOption}
                onVote={handleVote}
                isVoting={voting}
            />
        </div>
    );
};

export default PollPage;
