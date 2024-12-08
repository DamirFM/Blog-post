"use client";

import { useRouter } from 'next/navigation';
import NoteForm from '../components/NoteForm';

export default function AddNotePage() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/');
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Add a New Note</h1>
            <NoteForm onSuccess={handleSuccess} />
        </div>
    );
}
