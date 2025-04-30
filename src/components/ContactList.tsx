import { FC } from "react";
import { ContactItems } from "../components";
import { useContactsListQuery } from "../hooks";
import { Contact} from "../types/contact.ts";

type ContactListProps = {
    onEdit: (contact: Contact) => void;
}

export const ContactList: FC<ContactListProps> = ({onEdit}) => {
    const contactsListQuery = useContactsListQuery();

    if (contactsListQuery?.isLoading) return <p>Loading...</p>;
    if (contactsListQuery?.error) return <p>Error loading contacts</p>;

    return (
        <ul>
            {contactsListQuery?.data?.map((item) => (
                <ContactItems contactData={item} onEdit={onEdit} />
            ))}
        </ul>
    )
}