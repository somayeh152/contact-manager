import { useState } from "react";
import { ContactList, AddEditContactForm } from './components';
import { Contact } from "./types/contact.ts";
import { Container, Typography, Box } from "@mui/material";

function App() {
    const [initialContact, setInitialContact] = useState<Contact | null>(null);

    return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    bgcolor: "#f5f5f5",
                }}
                >
                <Container maxWidth="sm">
                    <Typography variant="h3" align="center" gutterBottom>
                        Contacts Manger
                    </Typography>
                    <AddEditContactForm
                        initialContact={initialContact}
                        onCancelEdit={() => setInitialContact(null)}
                    />
                    <ContactList
                        onEdit={(contact: Contact) => setInitialContact(contact)}
                    />
                </Container>
            </Box>
  )
}

export default App
