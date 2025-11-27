import { useState, useMemo, useEffect } from "react";

export default function ProductSearch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersdb = async () => {
      try {
        const users = await fetch('https://jsonplaceholder.typicode.com/posts')
        if(!users.ok) throw new Error(`HTTP ${users.status}`)

          const json = await users.json();

          setUsers(json)
      } catch (error) {
        console.log(error);
      }
    }
    usersdb()
  }, [])


  const filtered = useMemo(() => {
    return users
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .map((p) => ({ ...p, processed: true })); 
  }, [search]); 

  return (
    <div style={{ padding: 20 }}>
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ fontSize: 18, padding: 8, width: "300px" }}
      />
      <div>Найдено: {filtered.length}</div>
      <ul style={{ maxHeight: 500, overflow: "auto" }}>
        {filtered.slice(0, 20).map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
