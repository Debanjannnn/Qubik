import { Button } from "@/components/ui/button"; // Assuming Button component exists
import { Play } from "lucide-react"; // Assuming Play icon from lucide-react
import { GridBackgroundDemo } from "./background";

export function Footer() {
  return (
    <div className="py-12 px-4 sm:px-6 md:py-20 overflow-hidden">
      <GridBackgroundDemo>
        <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden my-16">
          <div className=" text-white p-16 py-20 relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-12 md:space-y-0 md:space-x-8">
              {/* Left side content */}
              <div className="max-w-md">
                <h2 className="text-4xl font-medium leading-tight mb-6">
                  The range of functionalities offered on the platforms includes the ability to connect
                </h2>
              </div>

              {/* Right side content */}
              <div className="max-w-md">
                <p className="text-gray-300 mb-10 text-lg">
                  With existing algorithmic strategies that reduce risk and automatically execute buy and sell orders.
                </p>

                <div className="flex items-center gap-6">
                  <Button className="bg-white text-black hover:bg-gray-100 rounded-md flex items-center gap-2">
                    Get started
                    <span className="ml-1">⋮⋮</span>
                  </Button>

                  <Button variant="ghost" className="text-white flex items-center gap-2">
                    <Play className="h-4 w-4 fill-white" />
                    Watch how it works
                  </Button>
                </div>
              </div>
            </div>

            {/* Background pattern - dots */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 grid grid-cols-10 gap-4">
                {Array(100)
                  .fill(0)
                  .map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white"></div>
                ))}
              </div>
              <div className="absolute bottom-10 right-10 grid grid-cols-10 gap-4">
                {Array(100)
                  .fill(0)
                  .map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GridBackgroundDemo>
    </div>
  );
} 