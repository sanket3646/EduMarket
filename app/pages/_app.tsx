import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <Component {...pageProps} user={user} />;
}

export default MyApp;
