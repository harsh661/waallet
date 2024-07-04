import Hero from "@/components/Hero/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center md:h-[calc(100%-80px)] pt-20">
      <Hero />

      <div className="hidden md:flex items-center w-full max-w-screen-xl justify-between mt-auto py-20">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-sm lg:text-lg">Customizable categories</h2>
          <p className="opacity-80 text-xs lg:text-sm">You can use our default <br /> category system</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-sm lg:text-lg">Interactive Visualization</h2>
          <p className="opacity-80 text-xs lg:text-sm">View your spending through <br /> intuitive graphs and charts</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-sm lg:text-lg">Multi-platform Access</h2>
          <p className="opacity-80 text-xs lg:text-sm">Access your financial data <br /> anytime, anywhere</p>
        </div>
      </div>
    </div>
  );
}
