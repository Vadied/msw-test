import { useEffect, useState } from "react";
import { Person } from "../models/person.model";

const List = () => {
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState("");

  const submitUser = () => {
    const newUser = { name: "test post" };
    fetch("https://add_user.it", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ name: "test post" }),
    })
      .then((r) => r.json())
      .then((data) => setData((old) => [...old, data.name]))
      .catch(() => setError("Error saving new users"));
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((data) => setData(data.map((c: Person) => c.name)))
      .catch(() => setError("Error fetching users"));
  }, []);

  return (
    <div className="List">
      <div>Users</div>
      {error && <p>{error}</p>}
      <button onClick={submitUser}>Click me</button>
      <ul>
        {data.map((character) => (
          <li key={character}>{character}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
