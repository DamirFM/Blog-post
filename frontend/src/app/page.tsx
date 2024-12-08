"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NoteList from './components/NoteList';
import { Note } from '../types';

export default function HomePage() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('http://localhost:3000/notes');
            const data = await response.json();
            const sorted = data.notes.sort(
                (a: Note, b: Note) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setNotes(sorted);
        };

        fetchNotes();
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-extrabold text-center mb-8  text-lime-950">Your Notes</h1>
            <div className="mb-6 flex justify-center">
                <Link
                    href="/add-note"
                    className="inline-block px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-300 shadow-sm"
                >
                    Add New Note
                </Link>
            </div>
            <NoteList notes={notes} setNotes={setNotes} />
        </div>
    );
}
