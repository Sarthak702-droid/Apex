
'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ShieldCheck } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { motion } from 'framer-motion';
import Image from "next/image";

const responsePlans = [
    {
        trigger: "Flood Response Protocol",
        steps: [
            { text: "Activate emergency communication channels with all logistics partners.", imageId: 'feature-market-linkage' },
            { text: "Identify and map all flooded and at-risk zones using the live disruption map.", imageId: 'feature-quality-report' },
            { text: "Reroute supply vehicles away from affected areas to alternate hubs.", imageId: 'logistics-map' },
            { text: "Deploy emergency food kits from designated warehouses to relief camps.", imageId: 'data-dashboard' },
            { text: "Coordinate with municipal authorities for last-mile distribution via boats or high-clearance vehicles.", imageId: 'hero-image' }
        ]
    },
    {
        trigger: "Transport Strike Contingency",
        steps: [
            { text: "Negotiate with alternate, non-striking transport unions or private fleet owners.", imageId: 'farmers-meeting' },
            { text: "Activate rail transport for long-haul supply movement where possible.", imageId: 'logistics-map' },
            { text: "Increase police escorts for vehicles that are operating to ensure safety.", imageId: 'about-image' },
            { text: "Issue public statements to prevent panic buying and assure citizens of stock availability.", imageId: 'city-planner' },
            { text: "Open direct-to-consumer channels at major warehouses to bypass last-mile disruptions.", imageId: 'supply-chain' }
        ]
    },
    {
        trigger: "Supply Shortage (e.g., Onions)",
        steps: [
            { text: "Immediately verify stock levels across all city warehouses and cold storages.", imageId: 'forecasting-chart' },
            { text: "Activate procurement from alternate state sources identified in the AI recommendation engine.", imageId: 'feature-crop-recommendation' },
            { text: "Implement temporary price controls and quantity limits at retail points to curb hoarding.", imageId: 'comic-page-9' },
            { text: "Release buffer stocks from emergency stockpiles to stabilize market prices.", imageId: 'comic-panel-3' },
            { text: "Launch public awareness campaigns on using alternatives and reducing wastage.", imageId: 'comic-page-10' }
        ]
    },
    {
        trigger: "Extreme Heatwave Protocol",
        steps: [
            { text: "Prioritize movement of perishable goods to facilities with reliable cold storage.", imageId: 'forecasting-chart' },
            { text: "Mandate temperature-controlled vehicles for all dairy, fruit, and vegetable transport.", imageId: 'logistics-map' },
            { text: "Adjust delivery schedules to cooler night-time hours to reduce spoilage and vehicle stress.", imageId: 'feature-quality-report' },
            { text: "Monitor energy grid stability and ensure backup power for all major cold storage hubs.", imageId: 'hero-image' },
            { text: "Distribute hydration and heat-stress guidance to all logistics and warehouse personnel.", imageId: 'farmers-meeting' }
        ]
    },
    {
        trigger: "Pandemic / Health Crisis Response",
        steps: [
            { text: "Activate contactless delivery and transaction protocols at all levels of the supply chain.", imageId: 'supply-chain' },
            { text: "Distribute Personal Protective Equipment (PPE) to all staff involved in handling and transport.", imageId: 'city-planner' },
            { text: "Increase frequency of sanitation at warehouses, vehicles, and market areas.", imageId: 'data-dashboard' },
            { text: "Use AI-demand forecasting to pre-emptively stock up on non-perishable essentials.", imageId: 'forecasting-chart' },
            { text: "Establish 'dark stores' or temporary urban distribution points to facilitate localized, safe distribution.", imageId: 'feature-market-linkage' }
        ]
    }
];

function StoryPanel({ step, index }: { step: { text: string; imageId: string }, index: number }) {
    const image = PlaceHolderImages.find(p => p.id === step.imageId);
    const isEven = index % 2 === 0;
  
    return (
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <div className={`md:order-${isEven ? 1 : 2}`}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg">
              {index + 1}
            </div>
            <p className="text-muted-foreground text-md">{step.text}</p>
          </div>
        </div>
        <div
          className={`relative aspect-video rounded-lg overflow-hidden shadow-lg md:order-${isEven ? 2 : 1}`}
        >
          {image && (
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
      </motion.div>
    );
  }

export function SOPs() {
    return (
        <Accordion type="single" collapsible className="w-full">
            {responsePlans.map((plan, index) => (
                 <AccordionItem value={`item-${index+1}`} key={index}>
                    <AccordionTrigger className="font-headline text-lg">{plan.trigger}</AccordionTrigger>
                    <AccordionContent>
                        <div className="divide-y divide-border">
                            {plan.steps.map((step, stepIndex) => (
                                <StoryPanel key={stepIndex} step={step} index={stepIndex} />
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
