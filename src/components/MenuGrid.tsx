import type { MenuItem } from "@/data/menu";
import MenuCard from "./MenuCard";

interface MenuGridProps {
  items: MenuItem[];
  searchQuery?: string;
}

const MenuGrid = ({ items, searchQuery }: MenuGridProps) => {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <p className="text-sm">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} searchQuery={searchQuery} />
      ))}
    </div>
  );
};

export default MenuGrid;
