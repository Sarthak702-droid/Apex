
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const schemes = [
  {
    id: 'nfsm-os',
    title: 'National Food Security Mission (NFSM) - Oilseeds',
    details:
      'This scheme focuses on increasing the production of oilseeds through area expansion and productivity enhancement. It provides financial assistance for quality seeds, demonstrations on improved technology, and integrated pest management.',
    benefits: ['Subsidized quality seeds', 'Financial aid for demonstrations', 'Support for farm implements'],
    link: 'https://www.nfsm.gov.in/',
  },
  {
    id: 'pm-kisan',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    details:
      'A central sector scheme with 100% funding from the Government of India. It provides income support of ₹6,000 per year in three equal installments to all landholding farmer families.',
    benefits: ['Direct income support', 'Financial stability', 'No restrictions on use of funds'],
    link: 'https://pmkisan.gov.in/',
  },
  {
    id: 'pmfby',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    details:
      'Provides comprehensive insurance coverage and financial support to farmers in the event of failure of any of the notified crops as a result of natural calamities, pests, and diseases.',
    benefits: ['Risk mitigation', 'Insurance for crop loss', 'Stabilizes farm income'],
    link: 'https://pmfby.gov.in/',
  },
  {
    id: 'nmoop',
    title: 'National Mission on Oilseeds and Oil Palm (NMOOP)',
    details: 'This mission aims to augment the availability of edible oils and reduce the import of edible oils by increasing the production and productivity of oilseeds and oil palm.',
    benefits: ['Special focus on oilseeds', 'Support for new technologies', 'Water conservation incentives'],
    link: '#',
  },
  {
    id: 'soil-health-card',
    title: 'Soil Health Card Scheme',
    details: 'Provides farmers with soil health cards which carry crop-wise recommendations of nutrients and fertilizers required for the individual farms to help farmers to improve productivity through judicious use of inputs.',
    benefits: ['Scientific basis for fertilizer use', 'Improves soil health', 'Increases crop yield'],
    link: 'https://soilhealth.dac.gov.in/',
  }
];

export function GovtSchemesSection() {
  return (
    <Card>
      <div className="p-6">
        <Accordion type="single" collapsible className="w-full">
          {schemes.map(scheme => (
            <AccordionItem key={scheme.id} value={scheme.id}>
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                {scheme.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-muted-foreground">{scheme.details}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {scheme.benefits.map(benefit => (
                      <Badge key={benefit} variant="secondary">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button asChild variant="link" className="p-0">
                  <Link href={scheme.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                  </Link>
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Card>
  );
}
