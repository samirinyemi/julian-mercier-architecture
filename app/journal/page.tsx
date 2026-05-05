import type { Metadata } from "next";
import { JournalIndexClient } from "@/components/JournalIndexClient";
import { journalEntries } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal — Julian Mercier",
  description:
    "Notes on materials, methods, and decisions made along the way.",
};

export default function JournalIndex() {
  return <JournalIndexClient entries={journalEntries} />;
}
