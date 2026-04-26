import { categories } from "@/data/menu";

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySidebar = ({ activeCategory, onCategoryChange }: CategorySidebarProps) => {
  return (
    <aside className="w-24 sm:w-28 shrink-0 h-[calc(100vh-7rem)] sticky top-28 overflow-y-auto bg-card border-r border-border">
      <nav className="flex flex-col gap-1 p-1.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`w-full py-3 px-2 rounded-lg text-xs font-medium text-center transition-all duration-200 leading-tight line-clamp-2 ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default CategorySidebar;
