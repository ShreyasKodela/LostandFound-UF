import { Button } from '@/components/ui/button';
import { Category } from '@/types';
import { cn } from '@/lib/utils';

interface FilterChipProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
  className?: string;
}

export function FilterChip({ label, value, isActive, onClick, className }: FilterChipProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      onClick={() => onClick(value)}
      className={cn(
        'transition-colors',
        isActive && 'bg-primary text-primary-foreground',
        className
      )}
    >
      {label}
    </Button>
  );
}

interface CategoryFilterProps {
  selectedCategory?: Category;
  onCategoryChange: (category: Category | undefined) => void;
}

const categories: { value: Category; label: string }[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'books', label: 'Books' },
  { value: 'keys', label: 'Keys' },
  { value: 'bags', label: 'Bags' },
  { value: 'other', label: 'Other' }
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <FilterChip
        label="All"
        value=""
        isActive={!selectedCategory}
        onClick={() => onCategoryChange(undefined)}
      />
      {categories.map((category) => (
        <FilterChip
          key={category.value}
          label={category.label}
          value={category.value}
          isActive={selectedCategory === category.value}
          onClick={() => onCategoryChange(category.value)}
        />
      ))}
    </div>
  );
}
