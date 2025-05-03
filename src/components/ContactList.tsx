import { FC } from "react";
import { ContactItems } from "../components";
import { useContactsListQuery } from "../hooks";
import { Contact} from "../types/contact.ts";
import { Typography, CircularProgress, Alert } from "@mui/material";

type ContactListProps = {
    onEdit: (contact: Contact) => void;
}

export const ContactList: FC<ContactListProps> = ({onEdit}) => {
    const contactsListQuery = useContactsListQuery();
    if (contactsListQuery?.isLoading) return <CircularProgress />;
    if (contactsListQuery?.error) return <Alert severity="error">Error loading contacts</Alert>;

    return (
        <>
            <Typography variant="h5" gutterBottom>Contact List</Typography>
            {contactsListQuery?.data?.map((item) => (
                <ContactItems key={item.id} contactData={item} onEdit={onEdit} />
            ))}
        </>
    )
}