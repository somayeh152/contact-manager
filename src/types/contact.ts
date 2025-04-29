export interface Contact {
    id: string;
    name: string;
    phone: string;
}

// export interface NewContact {
//     name: string;
//     phone: string;
// }

export type NewContact = Omit<Contact, "id">;

export type UpdateContact = Partial<NewContact> & { id: number };