import { useState } from "react";
import { ContactList, AddEditContactForm } from './components';
import { Contact } from "./types/contact.ts";

function App() {
    const [initialContact, setInitialContact] = useState<Contact | null>(null);

    return (
      <>
          <h1>Contacts List:</h1>
          <AddEditContactForm initialContact={initialContact} onCancelEdit={() => setInitialContact(null)} />
          <ContactList onEdit={(contact: Contact) => setInitialContact(contact)}/>
      </>
  )
}

export default App
