"use client";

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NoteForm from '../components/NoteForm';
import { Note } from '../../types';

export default function EditNotePage() {
    return (
        <Suspense fallback={<p className="text-center text-gray-600">Loading...</p>}>
            <EditNoteContent />
        </Suspense>
    );
}

function EditNoteContent() {
    const [note, setNote] = useState<Note | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        const fetchNote = async () => {
            if (!id) return;
            const response = await fetch(`http://localhost:3000/notes/${id}`);
            const data = await response.json();
            // Use data.note since we defined the GET route to return { note: { ... } }
            setNote(data.note);
        };

        fetchNote();
    }, [id]);

    const handleSuccess = () => {
        router.push('/');
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-extrabold text-center mb-8 text-lime-950">Edit Note</h1>
            {note ? (
                <NoteForm note={note} onSuccess={handleSuccess} />
            ) : (
                <p className="text-center text-gray-600">Loading...</p>
            )}
        </div>
    );
}
