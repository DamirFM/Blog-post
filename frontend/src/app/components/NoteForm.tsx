"use client";

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Note } from '../../types';

interface NoteFormProps {
    note?: Note | null;
    setNotes?: Dispatch<SetStateAction<Note[]>>;
    onSuccess?: () => void;
}

export default function NoteForm({ note = null, setNotes, onSuccess }: NoteFormProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setId(note._id);
        } else {
            setTitle('');
            setContent('');
            setId(null);
        }
    }, [note]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:3000/notes/${id}` : 'http://localhost:3000/notes';
        const body = { title, content };

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            if (setNotes) {
                if (method === 'POST') {
                    setNotes((prev) => [...prev, data.note]);
                } else {
                    setNotes((prev) => prev.map((item) => (item._id === id ? data.updatedNote : item)));
                }
            }
            if (onSuccess) {
                onSuccess();
            }
            setTitle('');
            setContent('');
            setId(null);
        } else {
            console.error('Error saving note:', data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow rounded-lg">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 sm:text-sm"
                    placeholder="Enter note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

            </div>
            <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                </label>
                <textarea
                    id="content"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 sm:text-sm text-gray-900 placeholder-gray-700"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm 
          font-medium rounded-md text-white bg-green-600 hover:bg-green-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
            >
                {id ? 'Update' : 'Add'} Note
            </button>
        </form>
    );
}
