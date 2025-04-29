import { useContactsListQuery } from "../hooks";

export const ContactList = () => {
    const {data, isLoading, error} = useContactsListQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading contacts</p>;

    return (
        <ul>
            {data?.map((item) => (
                <li key={item.id}>
                    <strong>{item.name}</strong> - {item.phone}
                </li>
            ))}
        </ul>
    )
}