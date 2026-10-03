import type { Metadata } from "next"
import { SpatialCoreConcept } from "@/components/concepts/v3/spatial-core"

export const metadata: Metadata = { title: "Spatial Core" }
export default function Page() { return <SpatialCoreConcept /> }
