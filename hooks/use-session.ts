"use client";

import { authClient } from "@/lib/auth/client";

export function useSession() {      //const { data, isPending, error } = useSession();
  return authClient.useSession();
}