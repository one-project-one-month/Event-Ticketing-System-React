import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/User/components/ui/accordin";
import { ImageUpscale, MapPin, Users } from "lucide-react";
import type { ReactNode } from "react";

interface VenueInfoProps {
  venueName: string;
  capacity: number;
  address: string;
  description: string;
  addons: string[];
  facilities: string;
}

export default function VenueInformation({
  venueName,
  capacity,
  address,
  description,
  addons,
  facilities,
}: VenueInfoProps) {
  return (
    <section className="figtreef flex flex-col gap-9">
      <h1 className="text-4xl font-bold uppercase">{venueName || ""}</h1>

      {/* Overview Venue Detail */}
      <div className="flex flex-row justify-between">
        <div className="grid h-fit w-96 grid-cols-[24px_1fr] gap-2">
          <Users />
          <p>{venueName || ""}</p>
          <MapPin />
          <p>{address}</p>
        </div>

        <div className="flex flex-row gap-9">
          <SmallCard icon={<Users />} label="Capacity" data={capacity || ""} />
          <SmallCard icon={<ImageUpscale />} label="Size" data="831.2 m²" />
        </div>
      </div>

      {/* Further Details */}
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        {/* Venue Information */}
        <AccordionItem
          className="mb-14 border-0 bg-[#FAFAFA] px-6 py-5"
          value="item-1"
        >
          <AccordionTrigger className="text-xl">Venue Information</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 border-t-2 border-[#e4e0e0] text-lg text-balance">
            <p>{description || ""}</p>
          </AccordionContent>
        </AccordionItem>

        {/* Facilities */}
        <AccordionItem
          className="mb-14 border-0 bg-[#FAFAFA] px-6 py-5"
          value="item-2"
        >
          <AccordionTrigger className="text-xl">Facilities & Services</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 border-t-2 border-[#e4e0e0] pt-3 text-lg text-balance">
            <ul className="list-disc pl-6 leading-relaxed">
              <li>
                <strong>{facilities || ""}</strong>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Addons */}
        <AccordionItem
          className="mb-14 border-0 bg-[#FAFAFA] px-6 py-5"
          value="item-3"
        >
          <AccordionTrigger className="text-xl">Additional Amenities</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 border-t-2 border-[#e4e0e0] pt-3 text-lg text-balance">
            {addons?.length > 0 ? (
              <ul className="list-disc pl-6 leading-relaxed">
                {addons.map((addon, index) => (
                  <li key={index}>
                    <strong>{addon}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No additional amenities listed.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
