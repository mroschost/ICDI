"use client";

import dynamic from "next/dynamic";

const ICDIApp = dynamic(() => import("../src/App"), {
  ssr: false,
  loading: () => (
    <main className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-800 border-t-transparent" />
    </main>
  ),
});

export default function ICDIClient() {
  return <ICDIApp />;
}
