
## Plan: Add Placeholder Food Images Per Category

### What
Replace the blank emoji placeholders with category-specific placeholder food images using Unsplash URLs. Each category gets a relevant food photo.

### How

**1. Update `MenuItem` interface** in `src/data/menu.ts`
- Add optional `image?: string` field

**2. Create a category-to-image mapping** in `src/data/menu.ts`
- Map each category to an Unsplash placeholder URL (e.g., `https://images.unsplash.com/...?w=200&h=200&fit=crop`):
  - breakfast → paratha/indian breakfast
  - dosa → dosa
  - soup → soup bowl
  - snacks → pakora/fried snacks
  - main-course → indian curry
  - tandoori → tandoori/grilled
  - chinese → indo-chinese
  - rice → rice/biryani
  - dal → dal/lentils
  - biryani → biryani
  - breads → naan/roti
  - thali → thali
  - extra → raita/sides
  - beverage → drinks

**3. Update `MenuCard.tsx`**
- Replace the emoji `<div>` with an `<img>` tag that uses the category image
- Fallback to a colored background if image fails to load

### Technical Details
- Uses free Unsplash source URLs (no API key needed)
- Images sized at 200x200 for fast loading on mobile
- `object-cover` for consistent card appearance

