import type { Metadata } from "next"
import { DocumentaryStudioConcept } from "@/components/concepts/v3/documentary-studio"

export const metadata: Metadata = { title: "Documentary Studio" }
export default function Page() { return <DocumentaryStudioConcept /> }
