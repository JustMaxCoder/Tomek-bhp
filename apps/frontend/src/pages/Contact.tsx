
import { Mail, Phone, Store, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MapComponent } from "@/components/MapComponent";

export default function Contact() {

  const galleryImages = [
    { src: "/attached_assets/ChIJkU9DeF-7HkcR2F-99SdJk7I-Sklep-BHP-Pogotowie-BHP-1_1760716833435.jpg", alt: "Sklep BHP - Fasada" },
    { src: "/attached_assets/category-odziez-robocza.jpg", alt: "Odzież robocza" },
    { src: "/attached_assets/category-obuwie.jpg", alt: "Obuwie robocze" },
    { src: "/attached_assets/category-ochrona-glowy.jpg", alt: "Ochrona głowy" },
    { src: "/attached_assets/category-rekawice.jpg", alt: "Rękawice" },
    { src: "/attached_assets/bhp-hero.jpg", alt: "Produkty BHP" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Kontakt
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sklep BHP w Nowym Dworze Mazowieckim
            </p>
          </div>

          {/* Contact Info Grid - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Address */}
            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2.5 shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Adres</h3>
                  <p className="text-sm text-muted-foreground leading-snug">
                    Bohaterów Modlina 17<br />
                    05-100 Nowy Dwór Mazowiecki
                  </p>
                </div>
              </div>
            </Card>

            {/* Phone */}
            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2.5 shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Telefon</h3>
                  <a
                    href="tel:533008146"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                    data-testid="link-phone"
                  >
                    533 008 146
                  </a>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2.5 shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm mb-1">Email</h3>
                  <a
                    href="mailto:szkolenia-bhp-nowy-dwor-mazowiecki@eduatut.pl"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors break-all"
                    data-testid="link-email"
                  >
                    szkolenia-bhp-nowy-dwor-mazowiecki@eduatut.pl
                  </a>
                </div>
              </div>
            </Card>

            {/* Hours */}
            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2.5 shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Godziny</h3>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>Pon-Pt: 07:00–17:00</li>
                    <li>Sobota: 09:00–13:00</li>
                    <li>Niedziela: Zamknięte</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Map Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
              Lokalizacja
            </h2>
            <MapComponent />
          </section>

          {/* Gallery Section - Compact */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
              Galeria
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {galleryImages.map((image, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      data-testid={`img-gallery-${index}`}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
