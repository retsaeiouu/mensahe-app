import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { supabase } from "../functions/supabase-init";
import { useState } from "react";

const AuthComponent = () => {
  // the code lines below can be found in https://supabase.com/docs/guides/auth/quickstarts/react
  // for styling, refer to https://supabase.com/docs/guides/auth/auth-helpers/auth-ui
  const [authType, setAuthType] = useState("sign_in");

  return (
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
  );
};

export default AuthComponent;
