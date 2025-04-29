import { useContactsListQuery, useDeleteContactMutation } from "../hooks";

export const ContactList = () => {
    const {data, isLoading, error} = useContactsListQuery();
    const { mutate: deleteContact, isPending} = useDeleteContactMutation();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading contacts</p>;

    return (
        <ul>
            {data?.map((item) => (
                <li key={item.id}>
                    <strong>{item.name}</strong> - {item.phone}
                    <button
                        onClick={() => deleteContact(item.id)}
                        disabled={isPending}
                        className="text-red-500 hover:underline"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </button>
                </li>
            ))}
        </ul>
    )
}