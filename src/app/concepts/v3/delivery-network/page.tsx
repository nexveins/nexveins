import type { Metadata } from "next"
import { DeliveryNetworkConcept } from "@/components/concepts/v3/delivery-network"

export const metadata: Metadata = { title: "Delivery Network" }
export default function Page() { return <DeliveryNetworkConcept /> }
