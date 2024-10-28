import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function AllEntries() {
  const { entries, deleteEntry } = useContext(EntryContext) as EntryContextType;
  let navigate = useNavigate();
  if (entries.length == 0) {
    return (
      <section>
        <h1 className="text-center font-semibold text-2xl m-5">You don't have any card</h1>
        <p className="text-center font-medium text-md">
          Lets{" "}
          <Link className="text-blue-400 dark:text-blue-300 underline underline-offset-1" to="/create">
            Create One
          </Link>
        </p>
      </section>
    );
  }
  return (
    <>
      <section className="mb-6 grid grid-cols-2 md:grid-cols-4">
        {entries.map((entry: Entry, index: number) => {
          return (
            <div
              id={entry.id}
              key={index}
              className="
              bg-gray-light dark:bg-gray-dark
              shadow-md shadow-gray-dark dark:shadow-white
              m-3 p-4 rounded
              flex flex-col justify-between
            "
            >
              <div
                className="
                lg:flex lg:flex-row lg:justify-between
                font-bold text-sm md:text-lg
              "
              >
                <h1>{entry.title}</h1>
                <p className="font-semibold break-words">
                  Scheduled:&nbsp;
                  <time>{new Date(entry.due_at.toString()).toLocaleDateString()}</time>
                </p>
              </div>
              <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{entry.description}</p>
              <section className="flex items-center justify-around lg:justify-between flex-col md:flex-row pt-2 md:pt-0">
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      deleteEntry(entry.id as string);
                    }}
                    className="m-1 md:m-2 p-1 font-semibold rounded-md bg-red-500 hover:bg-red-700"
                  >
                    ✖
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/edit/${entry.id}`, { replace: true });
                    }}
                    className="m-1 md:m-2 p-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-700"
                  >
                    🖊
                  </button>
                </div>
                <time className="text-right text-sm md:text-lg">
                  {new Date(entry.created_at.toString()).toLocaleDateString()}
                </time>
              </section>
            </div>
          );
        })}
      </section>
      <Link
        className="
        text-3xl text-white text-center
        block
        w-11/12 py-3 mx-auto
        rounded-md
        bg-blue-light dark:bg-blue-dark
        hover:bg-blue-alt dark:hover:bg-blue-alt
      "
        to="/create"
      >
        +
      </Link>
    </>
  );
}
