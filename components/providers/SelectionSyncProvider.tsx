"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSelectionStore } from "@/stores/selectionStore";

export function SelectionSyncProvider({ children }: { children: React.ReactNode }) {
  const { loadFromServer, setLoggedIn } = useSelectionStore();
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    // Check initial auth state
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && !hasLoadedRef.current) {
        hasLoadedRef.current = true;
        setLoggedIn(true);
        await loadFromServer();
      } else if (!user) {
        setLoggedIn(false);
        hasLoadedRef.current = false;
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user && !hasLoadedRef.current) {
        hasLoadedRef.current = true;
        setLoggedIn(true);
        await loadFromServer();
      } else if (event === 'SIGNED_OUT') {
        setLoggedIn(false);
        hasLoadedRef.current = false;
        // Optionally clear selection on logout
        // useSelectionStore.getState().clearSelection();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadFromServer, setLoggedIn]);

  return <>{children}</>;
}

