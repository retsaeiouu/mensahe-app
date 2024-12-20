import { useEffect, useState } from "react";
import { supabase } from "../functions/supabase-init";
import { Outlet } from "react-router";
import AuthComponent from "../components/AuthComponent";

const ProtectedRoute = () => {
  // if you're curious in the code lines below, refer to supabase auth api docs: https://supabase.com/docs/guides/auth/quickstarts/react
  const [session, setSession] = useState({} as unknown);

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

  // if there is no session, auth component will be returned
  // the <Outlet /> is just the children element
  return session ? <Outlet /> : <AuthComponent />;
};

export default ProtectedRoute;
