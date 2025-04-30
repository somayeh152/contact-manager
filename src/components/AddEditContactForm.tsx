    import { FC, useState, useEffect } from "react";
    import { useAddContactMutation, useEditContactMutation } from "../hooks";
    import { Contact } from "../types/contact.ts";

    type AddEditContactFormProps = {
        initialContact: Contact | null,
        onCancelEdit: () => void,
    }

    export const AddEditContactForm: FC<AddEditContactFormProps> = ({initialContact, onCancelEdit}) => {
        const [name, setName] = useState("");
        const [phone, setPhone] = useState("");

        const addContactMutation = useAddContactMutation();
        const editContactMutation = useEditContactMutation();

        useEffect(() => {
            if (initialContact?.id) {
                setName(initialContact?.name);
                setPhone(initialContact?.phone);
            }
        }, [initialContact]);

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (initialContact?.id){
                editContactMutation?.mutate({ id: initialContact?.id, name, phone });
                setName("");
                setPhone("");
                onCancelEdit();
            } else {
                addContactMutation?.mutate({ name, phone });
                setName("");
                setPhone("");
            }
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
                    disabled={addContactMutation?.isPending || editContactMutation.isPending}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {
                        initialContact?.id ?
                            editContactMutation?.isPending ? "Editing..." : "Edit Contact" :
                            addContactMutation?.isPending ? "Adding..." : "Add Contact"
                    }
                </button>
                {
                    initialContact?.id &&
                    <button
                        type="reset"
                        onClick={() => {
                                setName("");
                                setPhone("");
                                onCancelEdit();
                        }}
                    >
                        Cancel Edit
                    </button>
                }
                {addContactMutation?.error && <p className="text-red-500">Error adding contact</p>}
                {editContactMutation.error && <p className="text-red-500">Error editing contact</p>}
            </form>
        );
    };
