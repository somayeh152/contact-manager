import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/contacts";
import { Contact } from "../types/contact.ts";

const editContact = async (updatedContact: Contact): Promise<Contact> => {
    const {id , ...rest} = updatedContact;
    const response =  await axiosInstance.put(`/contacts/${id}`, rest);
    return response.data;
}

export const useEditContactMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editContact,
        onSuccess: () => {
            console.log("Successfully edit contact");
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
        onError: (error: Error) => {
            console.log("Error editing contact", error);
        }
    })
}
