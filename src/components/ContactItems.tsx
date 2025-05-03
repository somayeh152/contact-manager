import { FC } from "react";
import { Contact } from "../types/contact.ts";
import { useDeleteContactMutation } from "../hooks";
import { Box, Button, Stack, Typography } from "@mui/material";

type ContactItemsProps = {
    contactData: Contact,
    onEdit: (contact: Contact) => void;
}

export const ContactItems: FC<ContactItemsProps> = ({contactData, onEdit}) => {
    const deleteContactMutation = useDeleteContactMutation();

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            border="1px solid #ddd"
            borderRadius={2}
            mb={1}
        >
            <Box>
                <Typography sx={{fontWeight: 'bolder', fontSize: "1.4rem", display: "inline-block"}}>{contactData.name}</Typography>
                <Typography sx={{display: "inline-block", mx: "10px"}}>{contactData.phone}</Typography>
            </Box>
            <Stack direction="row" spacing={1}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(contactData)}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteContactMutation.mutate(contactData.id)}
                    disabled={deleteContactMutation.isPending}
                >
                    {deleteContactMutation.isPending ? "Deleting..." : "Delete"}
                </Button>
            </Stack>
        </Box>
    )
}