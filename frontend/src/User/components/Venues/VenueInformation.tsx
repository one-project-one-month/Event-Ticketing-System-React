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
              Product Information
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 border-t-2 border-[#e4e0e0] text-lg text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and
                experts.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="mb-14 border-0 bg-[#FAFAFA] px-6 py-5"
            value="item-2"
          >
            <AccordionTrigger className="text-xl">
              Shipping Details
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 border-t-2 border-[#e4e0e0] text-lg text-balance">
              <p>
                We offer worldwide shipping through trusted courier partners.
                Standard delivery takes 3-5 business days, while express
                shipping ensures delivery within 1-2 business days.
              </p>
              <p>
                All orders are carefully packaged and fully insured. Track your
                shipment in real-time through our dedicated tracking portal.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="mb-14 border-0 bg-[#FAFAFA] px-6 py-5"
            value="item-3"
          >
            <AccordionTrigger className="text-xl">
              Return Policy
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 border-t-2 border-[#e4e0e0] text-lg text-balance">
              <p>
                We stand behind our products with a comprehensive 30-day return
                policy. If you&apos;re not completely satisfied, simply return
                the item in its original condition.
              </p>
              <p>
                Our hassle-free return process includes free return shipping and
                full refunds processed within 48 hours of receiving the returned
                item.
              </p>
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
