import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Transform Your Pantry Experience
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Pantrify revolutionizes how you manage your kitchen. Say goodbye
              to expired foods and hello to effortless meal planning.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg">
              Start Your Pantry Makeover
            </button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/smart-pantry.jpg"
              alt="Smart Pantry Organization"
              width={600}
              height={400}
              className="rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
