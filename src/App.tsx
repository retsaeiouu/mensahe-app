import { useEffect, useState } from "react";
import "./App.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetcher = async () => {
    try {
      const response = await fetch(URL, {
        headers: { Authorization: `Bearer ${ANON_KEY}` },
      });

      if (!response.ok) {
        throw new Error("Fetch error.");
      }

      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <>
      <div className="blyat">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>{data.message}</p>
        )}
      </div>
    </>
  );
}

export default App;
