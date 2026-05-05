import type { Metadata } from "next";
import { ProjectsIndexClient } from "@/components/ProjectsIndexClient";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Julian Mercier",
  description:
    "Built and unbuilt. Sixteen projects across five geographies. Residences, hospitality, and retreats.",
};

export default function ProjectsIndex() {
  return <ProjectsIndexClient projects={projects} />;
}
