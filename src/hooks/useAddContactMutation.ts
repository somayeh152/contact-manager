import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/contacts";
import { Contact, NewContact } from "../types/contact.ts";

const addContact = async (newContact: NewContact): Promise<Contact> => {
    const response =  await axiosInstance.post("/contacts", newContact);
    return response.data;
}

export const useAddContactMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addContact,
        onSuccess: () => {
            console.log("Successfully add contact");
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
        onError: (error: Error) => {
            console.log("Error adding contact", error);
        }
    })
}