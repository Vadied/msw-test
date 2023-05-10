import { useEffect, useState } from "react";
import { Person } from "../models/person.model";

type Props = {
  id: number;
};
const Character = ({ id }: Props) => {
  const [character, setData] = useState("default");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((r) => r.json())
      .then((data: Person) => setData(data.name))
      .catch(() => setError("Error fetching user"))
  }, [id]);

  return (
    <div className="character">
      <h1>Character</h1>
      {error && <p>{error}</p>}
      <p>{character}</p>
    </div>
  );
};

export default Character;
