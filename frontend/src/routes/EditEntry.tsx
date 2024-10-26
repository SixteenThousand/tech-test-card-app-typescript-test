import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function EditEntry() {
  const { id } = useParams();
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date() };

  const { updateEntry, entries } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);

  useEffect(() => {
    const entry = entries.filter((entry) => entry.id == id)[0];
    setNewEntry(entry);
  }, []);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    updateEntry(id as string, newEntry);
  };
  return (
    <section
      className="
        flex justify-center flex-col w-fit
        ml-auto mr-auto mt-10 gap-5 p-8 
        rounded-md
        bg-gray-light dark:bg-gray-dark
      "
    >
      <input
        className="p-3 rounded-md dark:bg-gray-vdark dark:text-gray-vlight"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md dark:bg-gray-vdark dark:text-gray-vlight"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <input
        className="p-3 rounded-md dark:bg-gray-vdark dark:text-gray-vlight"
        type="date"
        name="created_at"
        value={new Date(newEntry.created_at).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="
          bg-blue-light dark:bg-blue-dark
          hover:bg-blue-alt dark:hover:bg-blue-alt
          font-semibold text-white p-3 rounded-md
        "
      >
        Update
      </button>
    </section>
  );
}
