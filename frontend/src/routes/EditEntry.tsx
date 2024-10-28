import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function EditEntry() {
  const { id } = useParams();
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), due_at: new Date() };

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
      <div>
        <p className="font-semibold">Title</p>
        <input
          className="p-3 rounded-md dark:bg-gray-vdark"
          type="text"
          placeholder="Title"
          name="title"
          value={newEntry.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <p className="font-semibold">Description</p>
        <textarea
          className="p-3 rounded-md dark:bg-gray-vdark"
          placeholder="Description"
          name="description"
          value={newEntry.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <p className="font-semibold">Creation Date</p>
        <input
          className="p-3 w-full rounded-md dark:bg-gray-vdark"
          type="date"
          name="created_at"
          value={new Date(newEntry.created_at).toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <p className="font-semibold">Scheduled Date</p>
        <input
          className="p-3 w-full rounded-md dark:bg-gray-vdark"
          type="date"
          name="due_at"
          value={new Date(newEntry.due_at).toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>
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
