// Trusted Companies Section
export const TrustedSection = () => {
  const companies = [
    "Volkswagen",
    "Samsung",
    "Cisco",
    "Vimeo",
    "P&G",
    "Hewlett Packard",
    "Citi",
    "Ericsson",
  ];

  return (
    <div className="mt-20 text-center py-12">
      <p className="text-gray-700 mb-8 font-medium">
        Trusted by over 17,000 companies and millions of learners around the
        world
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {companies.map((company) => (
          <div
            key={company}
            className="h-12 bg-gray-300 flex items-center justify-center px-4 text-sm font-semibold text-gray-600"
          >
            {company}
          </div>
        ))}
      </div>
    </div>
  );
};
