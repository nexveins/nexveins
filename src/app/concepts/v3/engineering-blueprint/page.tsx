import type { Metadata } from "next"
import { EngineeringBlueprintConcept } from "@/components/concepts/v3/engineering-blueprint"

export const metadata: Metadata = { title: "Engineering Blueprint" }
export default function Page() { return <EngineeringBlueprintConcept /> }
