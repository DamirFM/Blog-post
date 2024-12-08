"use client";

import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { Note } from '../../types';

interface NoteListProps {
    notes: Note[];
    setNotes: Dispatch<SetStateAction<Note[]>>;
}

export default function NoteList({ notes, setNotes }: NoteListProps) {
    const handleDelete = async (id: string) => {
        const response = await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setNotes((prev) => prev.filter((note) => note._id !== id));
        } else {
            console.error('Failed to delete note');
        }
    };

    if (notes.length === 0) {
        return <p className="text-center text-gray-600">No notes available. Create a new one!</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {notes.map((note) => (
                <div
                    key={note._id}
                    className="p-4 shadow rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-300"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{note.title}</h3>
                    <p className="text-gray-700 whitespace-pre-wrap prose-sm mb-4">{note.content}</p>
                    <div className="flex space-x-2">
                        <Link
                            href={`/edit-note?id=${note._id}`}
                            className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors duration-300 cursor-pointer"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(note._id)}
                            className="px-4 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
