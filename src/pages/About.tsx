import heroImg from "../assets/slide4.jpg";

export default function About() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center border-b text-white"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            About Shrestha Handicraft
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
            We create handcrafted copper and bronze statues of Buddha, Shiva,
            Ganesh, Namasangiti, Tara, Laxmi, and other sacred gods and
            goddesses with devotion and precision..
          </p>
          <div className="w-24 h-1 bg-gold-gradient mx-auto mt-8 rounded-full" />
        </div>
      </section>

      {/* Creations */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-medium mb-6">Our Sacred Creations</h2>

            <p className="text-gray-600 leading-relaxed">
              Our collection includes divine sculptures crafted with spiritual
              accuracy and artistic detail. Each statue is carefully shaped to
              reflect authentic expressions, sacred mudras, and traditional
              symbolism.
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              We focus on quality rather than mass production. Every piece is
              made with care to ensure it carries both aesthetic beauty and
              sacred presence.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-10 border-2 border-yellow-500">
            <h3 className="text-xl mb-4">Materials We Use</h3>

            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                High-Quality Copper
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                Antique & Polished Finishes
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                Optional Gold Accents
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-medium mb-14">Our Craftsmanship</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border hover:shadow-md transition">
              <h3 className="text-lg font-serif mb-3">Handcrafted Process</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Each statue is individually crafted with detailed attention to
                posture, ornaments, and divine expression.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border hover:shadow-md transition">
              <h3 className="text-lg font-serif mb-3">Sacred Accuracy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We carefully maintain traditional proportions and spiritual
                symbolism in every design.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border hover:shadow-md transition">
              <h3 className="text-lg  mb-3">Quality Inspection</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every piece is inspected and securely packaged before delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-medium mb-6">Our Mission</h2>

          <div className="w-20 h-1 bg-gold-gradient mx-auto mb-8 rounded-full" />

          <p className="text-gray-600 leading-relaxed">
            Our mission is to provide authentic copper and bronze deity statues
            that bring peace, devotion, and spiritual energy into homes and
            temples around the world. We are committed to quality, integrity,
            and sacred respect in every creation.
          </p>
        </div>
      </section>
    </main>
  );
}
