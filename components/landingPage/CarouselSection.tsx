import React from "react";
import Image from "next/image";

const CompanyCarousel = () => {
  const companies = [
    { name: "Layers", logo: "/landingPage/layer-logo.png" },
    { name: "Sisyphus", logo: "/landingPage/sisyphus.png" },
    { name: "Circooles", logo: "/landingPage/circooles.png" },
    { name: "Catalog", logo: "/landingPage/catalog.png" },
    { name: "Quotient", logo: "/landingPage/quotient.png" },
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-lg md:text-xl font-medium text-gray-600 mb-8">
          Join 4,000+ companies already growing
        </h2>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Scrollable Carousel */}
          <div className="overflow-x-auto pb-6 -mx-4 px-4">
            <div className="flex space-x-8 md:space-x-12 lg:space-x-16 w-max min-w-full">
              {companies.map((company, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center"
                  style={{ minWidth: "160px" }} // Ensures consistent sizing
                >
                  <div className="relative h-12 w-full opacity-70 hover:opacity-100 transition-opacity duration-200">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      className="object-contain object-center"
                      quality={100}
                      unoptimized // Remove if you want Next.js to optimize the images
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Fade Effects (optional) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default CompanyCarousel;