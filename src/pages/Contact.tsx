import { Mail, Phone, MapPin, Clock } from "lucide-react";
import heroImg from "../assets/slide3.jpg";

const contactItems = [
  {
    title: "Visit Our Store",
    icon: MapPin,
    content: (
      <a
        href="https://maps.app.goo.gl/w9V9LKcDpbo9cWC66"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 text-xs md:text-sm leading-relaxed hover:text-yellow-500 transition"
      >
        Yashodhara Marg, <br />
        Thaina, Lalitpur, <br />
        Nepal
      </a>
    ),
  },
  {
    title: "Call Us",
    icon: Phone,
    content: (
      <div className="text-gray-600 text-sm space-y-1">
        <a
          href="tel:+9779841835052"
          className="block hover:text-yellow-600 transition"
        >
          +977 9841835052
        </a>
        <a
          href="tel:+9779863021927"
          className="block hover:text-yellow-600 transition"
        >
          +977 9863021927
        </a>
      </div>
    ),
  },
  {
    title: "Email Us",
    icon: Mail,
    content: (
      <p className="text-gray-600 text-sm">
        info@shresthahandicraft.com
      </p>
    ),
  },
  {
    title: "Business Hours",
    icon: Clock,
    content: (
      <p className="text-gray-600 text-sm">
        Sun – Fri: 08:00AM – 6:00PM <br />
        Sat: 08:00AM – 11:00AM
      </p>
    ),
  },
];



export default function Contact() {
  return (
    <main className="bg-white text-black">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center border-b text-white"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Contact Shrestha Handicraft
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
            We are here to assist you with product inquiries, orders, or store
            visits. Reach out to us anytime.
          </p>
          <div className="w-24 h-1 bg-gold-gradient mx-auto mt-8 rounded-full" />
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-10">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {contactItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="border rounded-2xl py-8 px-6 hover:shadow-lg transition group"
          >
            <div className="w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition">
              <Icon className="w-6 h-6 text-yellow-700" />
            </div>

            <h3 className="font-semibold text-sm md:text-lg mb-3">
              {item.title}
            </h3>

            {item.content}
          </div>
        );
      })}
    </div>
  </div>
</section>


      {/* Map Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium">Find Us on the Map</h2>
            <p className="text-gray-600 mt-4">
              Visit our physical store to explore our handcrafted statues.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d278.8499774799257!2d85.32580324891566!3d27.669542510096424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19dada4b3011%3A0x81252ee0c65ca0b6!2zTTg5RytSRlIsIOCkmuCkleCksOCljeKAjeCkrOCkueCkv-CksiAtIOCkruCkueCkvuCkrOCljOCkp-CljeCkpiDgpLLgpIEsIExhbGl0cHVyIDQ0NjAw!5e0!3m2!1sen!2snp!4v1771393202871!5m2!1sen!2snp"
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
