
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { AlertCircle, Zap, ShieldCheck } from "lucide-react"
  
const responsePlans = [
    {
        trigger: "Flood Response Protocol",
        content: [
            "1. Activate emergency communication channels with all logistics partners.",
            "2. Identify and map all flooded and at-risk zones using the live disruption map.",
            "3. Reroute supply vehicles away from affected areas to alternate hubs.",
            "4. Deploy emergency food kits from designated warehouses to relief camps.",
            "5. Coordinate with municipal authorities for last-mile distribution via boats or high-clearance vehicles."
        ]
    },
    {
        trigger: "Transport Strike Contingency",
        content: [
            "1. Negotiate with alternate, non-striking transport unions or private fleet owners.",
            "2. Activate rail transport for long-haul supply movement where possible.",
            "3. Increase police escorts for vehicles that are operating to ensure safety.",
            "4. Issue public statements to prevent panic buying and assure citizens of stock availability.",
            "5. Open direct-to-consumer channels at major warehouses to bypass last-mile disruptions."
        ]
    },
    {
        trigger: "Supply Shortage (e.g., Onions)",
        content: [
            "1. Immediately verify stock levels across all city warehouses and cold storages.",
            "2. Activate procurement from alternate state sources identified in the AI recommendation engine.",
            "3. Implement temporary price controls and quantity limits at retail points to curb hoarding.",
            "4. Release buffer stocks from emergency stockpiles to stabilize market prices.",
            "5. Launch public awareness campaigns on using alternatives and reducing wastage."
        ]
    }
]

export function SOPs() {
    return (
        <Accordion type="single" collapsible className="w-full">
            {responsePlans.map((plan, index) => (
                 <AccordionItem value={`item-${index+1}`} key={index}>
                    <AccordionTrigger className="font-headline">{plan.trigger}</AccordionTrigger>
                    <AccordionContent>
                        <ul className="space-y-2 text-muted-foreground pl-4">
                            {plan.content.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start gap-3">
                                    <ShieldCheck className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
