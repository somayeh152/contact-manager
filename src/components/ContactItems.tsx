import { FC } from "react";
import { Contact } from "../types/contact.ts";
import { useDeleteContactMutation } from "../hooks";

type ContactItemsProps = {
    contactData: Contact,
    onEdit: (contact: Contact) => void;
}

export const ContactItems: FC<ContactItemsProps> = ({contactData, onEdit}) => {
    const deleteContactMutation = useDeleteContactMutation();

    return (
        <li key={contactData.id}>
            <strong>{contactData.name}</strong> - {contactData.phone}
            <button
                onClick={() => deleteContactMutation?.mutate(contactData.id)}
                disabled={deleteContactMutation?.isPending}
                className="text-red-500 hover:underline"
            >
                {deleteContactMutation?.isPending ? "Deleting..." : "Delete"}
            </button>
            <button
                onClick={() => onEdit(contactData)}
                className="text-red-500 hover:underline"
            >
                Edit
            </button>
        </li>
    )
}