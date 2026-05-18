import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Prevent refetch when window regains focus
            staleTime: 24 * 60 * 60 * 1000, // 1d
            retry: 1, // Only retry once on failure
        },
    },
});
