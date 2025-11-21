import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

interface Review {
  id: number;
  name: string;
  timeAgo: string;
  rating: number;
  text: string;
  initials: string;
  color: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "michał h",
    timeAgo: "7 miesięcy temu",
    rating: 5,
    text: "Polecam. Sklep nieduży ale dobrze zaopatrzony. Pomocna i miła obsługa",
    initials: "m",
    color: "bg-purple-500"
  },
  {
    id: 2,
    name: "Marlena Bielińska-Sa...",
    timeAgo: "8 miesięcy temu",
    rating: 5,
    text: "Duży wybór towaru, miła obsługa, bardzo pomocna, realizacja zamówień...",
    initials: "M",
    color: "bg-orange-500"
  },
  {
    id: 3,
    name: "Daniel Czaja",
    timeAgo: "1 rok temu",
    rating: 5,
    text: "Polecam ten sklep i tych ludzi na kamizelki z nadrukiem czekalem aż 24 godziny jestem zaskoczo...",
    initials: "D",
    color: "bg-blue-500"
  },
  {
    id: 4,
    name: "Aleksander Śliwiński",
    timeAgo: "1 rok temu",
    rating: 5,
    text: "Polecam sklep firmom i osobom prywatnym. Dobrze zaopatrzony, przystępne ceny i przemiła...",
    initials: "A",
    color: "bg-gray-500"
  },
  {
    id: 5,
    name: "Anna Kowalska",
    timeAgo: "2 miesiące temu",
    rating: 5,
    text: "Świetny wybór odzieży roboczej. Zakupy przebiegły sprawnie, obsługa profesjonalna",
    initials: "A",
    color: "bg-green-500"
  },
  {
    id: 6,
    name: "Tomasz Nowak",
    timeAgo: "3 miesiące temu",
    rating: 5,
    text: "Najlepsze ceny w mieście. Szeroki asortyment obuwia BHP. Polecam każdemu",
    initials: "T",
    color: "bg-red-500"
  }
];

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 4;
  const maxIndex = Math.max(0, reviews.length - reviewsPerPage);

  const nextReview = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevReview = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + reviewsPerPage);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Opinie
          </h2>
          <p className="text-muted-foreground">
            Nasze oceny z Google
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-2xl font-bold">4.5</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-yellow-400/50 text-yellow-400/50"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">(23)</span>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleReviews.map((review) => (
              <Card key={review.id} className="overflow-hidden" data-testid={`card-review-${review.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className={`${review.color} text-white uppercase`}>
                        {review.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-sm truncate">{review.name}</span>
                        <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.timeAgo}</span>
                    </div>
                  </div>

                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-foreground mb-2 line-clamp-3">
                    {review.text}
                  </p>

                  <button 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`button-read-more-${review.id}`}
                  >
                    Czytaj więcej
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              size="icon"
              variant="outline"
              onClick={prevReview}
              disabled={currentIndex === 0}
              className="rounded-full h-10 w-10 disabled:opacity-30"
              data-testid="button-prev-reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(Math.max(0, Math.min(i, maxIndex)))}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i >= currentIndex && i < currentIndex + reviewsPerPage
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  data-testid={`button-review-dot-${i}`}
                />
              ))}
            </div>

            <Button
              size="icon"
              variant="outline"
              onClick={nextReview}
              disabled={currentIndex >= maxIndex}
              className="rounded-full h-10 w-10 disabled:opacity-30"
              data-testid="button-next-reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
