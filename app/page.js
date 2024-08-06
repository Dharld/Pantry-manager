import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Pantrify</div>
          <div>
            <a href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2">
              Features
            </a>
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Organize Your Pantry with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Pantrify helps you keep track of your groceries, plan meals, and
              reduce food waste.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg">
              Start Organizing
            </button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/pantry-image.jpg"
              alt="Organized Pantry"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Pantrify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
