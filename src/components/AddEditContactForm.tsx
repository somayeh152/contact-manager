    import { FC, useState, useEffect } from "react";
    import { useAddContactMutation, useEditContactMutation } from "../hooks";
    import { Contact } from "../types/contact.ts";
    import { TextField, Button, Stack, Typography, Alert, FormGroup } from "@mui/material";

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
            <FormGroup onSubmit={handleSubmit}>
                <Stack spacing={2} mb={4}>
                    <Typography variant="h6">
                        {initialContact?.id ? "Edit Contact" : "Add New Contact"}
                    </Typography>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        size="small"
                    />
                    <TextField
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        required
                        size="small"
                    />
                    <Stack direction="row" spacing={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={addContactMutation.isPending || editContactMutation.isPending}
                        >
                            {initialContact?.id
                                ? editContactMutation.isPending ? "Editing..." : "Edit Contact"
                                : addContactMutation.isPending ? "Adding..." : "Add Contact"}
                        </Button>
                        {initialContact?.id && (
                            <Button variant="outlined" color="info" onClick={() => {
                                setName("");
                                setPhone("");
                                onCancelEdit();
                            }}>
                                Cancel
                            </Button>
                        )}
                    </Stack>
                    {addContactMutation.error && <Alert severity="error">Error adding contact</Alert>}
                    {editContactMutation.error && <Alert severity="error">Error editing contact</Alert>}
                </Stack>
            </FormGroup>
        );
    };
