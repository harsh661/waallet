import Hero from "@/components/Hero/hero";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center h-[calc(100%-80px)] pt-20">
      <Hero />

      <div className="flex items-center w-full max-w-screen-xl justify-between mt-auto py-20">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Customizable categories</h2>
          <p className="opacity-80">You can use our default <br /> category system</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Customizable categories</h2>
          <p className="opacity-80">You can use our default <br /> category system</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Customizable categories</h2>
          <p className="opacity-80">You can use our default <br /> category system</p>
        </div>
      </div>
    </div>
  );
}
