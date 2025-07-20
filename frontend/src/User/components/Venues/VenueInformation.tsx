import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/User/components/ui/accordin";
import { ImageUpscale, MapPin, Users } from "lucide-react";
import type { ReactNode } from "react";

export default function VenueInformation() {
  return (
    <section className="figtreef flex flex-col gap-9">
      <h1 className="text-4xl font-bold uppercase">LOTTE HOTEL YANGON</h1>
      {/* Overview Venue Detail */}
      <div className="flex flex-row justify-between">
        <div className="grid h-fit w-96 grid-cols-2 grid-cols-[24px_1fr] gap-2">
          <Users />
          <p>Sapphire Ballroom</p>
          <MapPin />
          <p>
            2F, No. 82, Sin Phyu Shin Avenue, Pyay Road, Hlaing Township,
            Yangon, Myanmar
          </p>
        </div>
        <div className="flex flex-row gap-9">
          <SmallCard icon={<Users />} label="Capacity" data="800 guests" />
          <SmallCard icon={<ImageUpscale />} label="Size" data="831.2 m²" />
        </div>
      </div>
      {/* Furthur more Details */}
      <div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem
            className="mb-14 border-0 bg-[#FAFAFA] px-6 py-5"
            value="item-1"
          >
            <AccordionTrigger className="text-xl">
              Venue Information
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 border-t-2 border-[#e4e0e0] text-lg text-balance">
              <p>
                LOTTE HOTEL YANGON's second largest function hall, The Sapphire
                Ballroom is a stunning, functional space which may be divided
                into three sections, allowing guests to customize the venue to
                suit their exact demands and specifications.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="mb-14 border-0 bg-[#FAFAFA] px-6 py-5"
            value="item-2"
          >
            <AccordionTrigger className="text-xl">
              Facilities & Services
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 border-t-2 border-[#e4e0e0] pt-3 text-lg text-balance">
              <ul className="list-disc pl-6 leading-relaxed">
                <li>
                  <strong>Audio/Visual Capabilities:</strong> Comprehensive AV
                  support for events.
                </li>
                <li>
                  <strong>Electricity & Appliance Rental:</strong> Available
                  upon request.
                </li>
                <li>
                  <strong>Furniture Rental:</strong> Options for various event
                  setups.
                </li>
                <li>
                  <strong>Floor Space Planning:</strong> Assistance with layout
                  arrangements.
                </li>
                <li>
                  <strong>Advertising Space:</strong> Opportunities for event
                  promotion.
                </li>
                <li>
                  <strong>Event Planning Assistance:</strong> Onsite support for
                  event coordination.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="mb-14 border-0 bg-[#FAFAFA] px-6 py-5"
            value="item-3"
          >
            <AccordionTrigger className="text-xl">
              Additional Amenities
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 border-t-2 border-[#e4e0e0] pt-3 text-lg text-balance">
              <ul className="list-disc pl-6 leading-relaxed">
                <li>
                  <strong>Security System:</strong> Robust security measures in
                  place.
                </li>
                <li>
                  <strong>Air Conditioning:</strong> Well-maintained climate
                  control.
                </li>
                <li>
                  <strong>Restrooms:</strong> Clean and accessible facilities.
                </li>
                <li>
                  <strong>Nearby Dining Options:</strong> Various food vendors
                  and cafes in the vicinity.
                </li>
                <li>
                  <strong>VIP Lounge & Media Room:</strong> Available for
                  special guests and press.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

type SmallCardProps = {
  icon: ReactNode;
  label: string;
  data: string | number;
};

function SmallCard({ icon, label, data }: SmallCardProps) {
  return (
    <div className="flex size-36 flex-col items-center justify-center gap-3 rounded-lg shadow-2xl">
      <div className="size-6">{icon}</div>
      <p>{label}</p>
      <p className="text-lg font-semibold">{data}</p>
    </div>
  );
}
