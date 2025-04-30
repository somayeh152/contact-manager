import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/contacts";

const deleteContact = async (contactId: string): Promise<void> => {
    await axiosInstance.delete(`/contacts/${contactId}`);
}

export const useDeleteContactMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            console.log("Successfully removed the contact");
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
        onError: (error: Error) => {
            console.log("Error deleting contact", error);
        }
    })
}