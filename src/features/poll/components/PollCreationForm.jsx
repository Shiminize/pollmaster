import React, { useState } from 'react';

export const PollCreationForm = ({ onCreate, isCreating }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOptionField = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ question, options });
        // Reset form is handled by parent or useEffect, but here we can just clear if successful? 
        // Ideally parent tells us. For now, we'll clear local state.
        setQuestion('');
        setOptions(['', '']);
    };

    return (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Poll</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Poll Question</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="e.g., What is the best luxury car brand?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Options</label>
                    {options.map((opt, idx) => (
                        <div key={idx} className="flex gap-2">
                            <input
                                type="text"
                                className="input-field"
                                placeholder={`Option ${idx + 1}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                required={idx < 2}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addOptionField}
                        className="text-sm text-primary-600 font-medium hover:text-primary-700"
                    >
                        + Add another option
                    </button>
                </div>

                <div className="pt-2">
                    <button type="submit" disabled={isCreating} className="btn-primary">
                        {isCreating ? 'Creating...' : 'Publish Poll'}
                    </button>
                </div>
            </form>
        </section>
    );
};
