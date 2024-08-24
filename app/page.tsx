import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TO DO OTP verification*/}
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
      <PatientForm/>
      <div className="text-14 regular mt-20 flex justify-between ">
     <p className="justify-items-end text-dark-600 xl:text-left "> © 2024 Healthmaster</p>
      </div>
      <Link href="/?admin=true" className="text-green-500">
        Admin
      </Link>

    </section>

    <Image 
    src="/assets/images/background-2.webp"
    alt="Background"
    quality={100}
    width={1000}
    height={1000}
    className="side-img max-w-[50%]" 
    />

    </div>
  );
}
