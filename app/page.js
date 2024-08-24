import Image from "next/image";

export default function Home() {
  return (
   <div className="home">
      <h1>Home Page</h1>
      <Image src="/images/nextjs.png" alt="nextjs" width="300" height="300" />

   </div>
  );
}
