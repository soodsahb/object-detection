import Detector from "@/components/Object-detection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
    <h1 className=" gradient-title font-extrabold text-3xl md:text-6xl lg:text-7xl -tracking-tighter md:px-6">Object Detection Alarm</h1>
    <Detector></Detector>
    </main>
  );
}
