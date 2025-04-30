// import { useState } from "react";
// import { useEditContactMutation } from "../hooks";
//
// export const EditContactForm = () => {
//     const [name, setName] = useState("");
//     const [phone, setPhone] = useState("");
//
//     const editContactMutation = useEditContactMutation();
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         editContactMutation?.mutate({ name, phone });
//         setName("");
//         setPhone("");
//     };
//
//     return (
//         <form onSubmit={handleSubmit} className="space-y-3 mb-6">
//             <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//             />
//             <input
//                 type="text"
//                 placeholder="Phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//             />
//             <button
//                 type="submit"
//                 disabled={editContactMutation?.isPending}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//                 {editContactMutation?.isPending ? "Adding..." : "Add Contact"}
//             </button>
//             {editContactMutation?.error && <p className="text-red-500">Error adding contact</p>}
//         </form>
//     );
// };


import { useState } from "react";
import { Contact } from "../types/contact";
import { useEditContactMutation } from "../hooks";

export const EditContactForm = ({ contact, onClose }: { contact: Contact; onClose: () => void }) => {
    const [name, setName] = useState(contact.name);
    const [phone, setPhone] = useState(contact.phone);
    const { mutate, isPending } = useEditContactMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ id: contact.id, name, phone });
        onClose(); // بستن فرم ویرایش بعد از ارسال
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />
            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    {isPending ? "Saving..." : "Save"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};
