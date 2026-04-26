import type { MenuItem } from "@/data/menu";
import { itemImages, categoryImages } from "@/data/menu";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  searchQuery?: string;
}

const HighlightText = ({ text, query }: { text: string; query?: string }) => {
  if (!query?.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/25 text-card-foreground rounded-sm px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
};

const MenuCard = ({ item, searchQuery }: MenuCardProps) => {
  const isVeg = item.type === "veg";
  const [imgError, setImgError] = useState(false);
  const [qty, setQty] = useState(0);
  const imageUrl = itemImages[item.id] || categoryImages[item.category];

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden flex flex-col">
      {/* Food image */}
      <div className="w-full aspect-[4/3] bg-primary-foreground flex items-center justify-center overflow-hidden">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-4xl sm:text-5xl">{item.emoji}</span>
        )}
      </div>

      <div className="p-2.5 flex flex-col gap-1 flex-1">
        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  tag === "popular"
                    ? "bg-tag-popular/15 text-tag-popular"
                    : "bg-tag-special/15 text-tag-special"
                }`}
              >
                {tag === "popular" ? "⭐ Bestseller" : "✨ Special"}
              </span>
            ))}
          </div>
        )}

        {/* Veg/Non-veg indicator + Name */}
        <div className="flex items-start gap-1.5">
          <span
            className={`mt-1 w-3.5 h-3.5 shrink-0 border-2 rounded-sm flex items-center justify-center ${
              isVeg ? "border-veg" : "border-non-veg"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isVeg ? "bg-veg" : "bg-non-veg"
              }`}
            />
          </span>
          <h3 className="text-xs sm:text-sm font-semibold text-card-foreground leading-tight line-clamp-2">
            <HighlightText text={item.name} query={searchQuery} />
          </h3>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <p className="text-sm font-bold text-foreground">₹{item.price}</p>
          {qty === 0 ? (
            <button
              onClick={() => setQty(1)}
              className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-lg hover:bg-primary/90 transition-colors"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-primary rounded-lg">
              <button
                onClick={() => setQty((q) => Math.max(0, q - 1))}
                className="text-primary-foreground p-1 hover:bg-primary/80 rounded-l-lg transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-primary-foreground text-xs font-bold min-w-[16px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="text-primary-foreground p-1 hover:bg-primary/80 rounded-r-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
