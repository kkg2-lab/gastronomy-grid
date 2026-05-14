import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { menuItems } from "@/data/menu";
import CategorySidebar from "@/components/CategorySidebar";
import MenuGrid from "@/components/MenuGrid";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

const fuse = new Fuse(menuItems, {
  keys: ["name", "category"],
  threshold: 0.35,
  includeMatches: true,
  minMatchCharLength: 2,
});

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const filteredItems = useMemo(() => {
    let items = menuItems;

    if (debouncedQuery.trim()) {
      const results = fuse.search(debouncedQuery);
      items = results.map((r) => r.item);
    } else if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (vegFilter !== "all") {
      items = items.filter((item) => item.type === vegFilter);
    }
    return items;
  }, [activeCategory, vegFilter, debouncedQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3">
        <h1 className="text-lg font-bold text-foreground">🍽️ Punjabi Kitchenn, Dhanbad</h1>
      </header>

      {/* Search Bar */}
      <div className="sticky top-[53px] z-10 bg-card border-b border-border px-4 py-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search menu items... (typo-tolerant)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 rounded-lg bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Veg / Non-Veg Toggle */}
      <div className="sticky top-[105px] z-10 bg-card border-b border-border px-4 py-2 flex gap-2">
        {(["all", "veg", "non-veg"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setVegFilter(filter)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              vegFilter === filter
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {filter === "all" ? "All" : filter === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="flex">
        <CategorySidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <main className="flex-1 min-w-0 overflow-y-auto">
          <MenuGrid items={filteredItems} searchQuery={debouncedQuery} />
        </main>
      </div>
    </div>
  );
};

export default Index;
