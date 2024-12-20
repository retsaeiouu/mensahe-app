import { useNavigate } from "react-router";
import { supabase } from "../functions/supabase-init";

export const SignOutButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={async () => {
        navigate("/");
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
      }}
    >
      signout
    </div>
  );
};
