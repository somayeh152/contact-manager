import { useState } from "react";
import { useAddContactMutation } from "../hooks";

export const AddContactForm = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const { mutate, isPending, error } = useAddContactMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ name, phone });
        setName("");
        setPhone("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
            />
            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
            />
            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {isPending ? "Adding..." : "Add Contact"}
            </button>
            {error && <p className="text-red-500">Error adding contact</p>}
        </form>
    );
};
