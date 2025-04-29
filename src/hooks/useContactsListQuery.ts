import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../api/contacts.ts";
import { Contact } from "../types/contact.ts";

const fetchContacts = async (): Promise<Contact[]> => {
    const response = await axiosInstance.get('/contacts');
    return response.data;
};

export const useContactsListQuery = () => {
    return useQuery<Contact[], Error>({
        queryKey: ['contacts'],
        queryFn: fetchContacts,
        staleTime: 1000 * 60, // optional: 1 min
    });
};
