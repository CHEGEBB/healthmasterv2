import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[496px]">
          <Image 
          src="/assets/icons/png/logo3.png "
          alt="HealthMaster"
          quality={100}
          width={1000}
          height={1000}
          className="mb-12 h-10 w-fit"

          />
      </div>

    </section>
    </div>
  );
}
