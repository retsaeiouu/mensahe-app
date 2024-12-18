import { useEffect, useState } from "react";

import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";

import "./App.css";

const EDGE_URL = import.meta.env.VITE_SUPABASE_URL;
const AUTH_URL = import.meta.env.VITE_SUPABASE_AUTH_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(AUTH_URL, ANON_KEY);

function App() {
  const [session, setSession] = useState({} as unknown);
  const [authType, setAuthType] = useState("sign_in");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return !session ? (
    <>
      <Auth
        supabaseClient={supabase}
        view={authType as ViewType}
        appearance={{
          theme: ThemeSupa,
          style: {
            container: { width: "340px" },
            input: { borderRadius: "20px", color: "#282d30" },
            button: {
              borderRadius: "20px",
              backgroundColor: "#D8E2DC",
              color: "#282d30",
              border: "0",
              fontWeight: "700",
            },
            message: {
              padding: "1em",
              backgroundColor: "transparent",
              border: "2px solid #FEC89A",
              borderRadius: "20px",
              color: "#FEC89A",
              fontWeight: "600",
            },
          },
        }}
        providers={[]}
        showLinks={false}
      />
      {authType === "sign_in" ? (
        <div
          style={{ textAlign: "center" }}
          onClick={() => setAuthType("sign_up")}
        >
          I don't have an account.
        </div>
      ) : (
        <div
          style={{ textAlign: "center" }}
          onClick={() => setAuthType("sign_in")}
        >
          I already have an account.
        </div>
      )}
    </>
  ) : (
    <Main session={session} />
  );
}

const Main = ({ session }: { session: unknown }) => {
  const [data, setData] = useState({ message: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetcher = async () => {
    try {
      const response = await fetch(EDGE_URL, {
        headers: {
          Authorization: `Bearer ${(session as Session).access_token}`,
        },
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
          data.message && <p>{data.message}</p>
        )}
      </div>
      <button onClick={signOut}>signout</button>
    </>
  );
};

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    window.location.reload();
  } catch (err) {
    console.error("Error signing out: ", (err as Error).message);
  }
};

export default App;
