'use client';

import React from 'react';
import Button from '@/components/ui/Button';

interface CreativeFilterProps<T extends string> {
  categories: T[];
  currentCategory: T | null;
  onChangeCategory: (category: T | null) => void;
  label?: string;
}

export function CreativeFilter<T extends string>({
  categories,
  currentCategory,
  onChangeCategory,
  label = 'Filter kategori'
}: CreativeFilterProps<T>) {
  return (
    <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label={label}>
      <Button
        variant={currentCategory === null ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => onChangeCategory(null)}
        aria-pressed={currentCategory === null}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={currentCategory === category ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onChangeCategory(category)}
          aria-pressed={currentCategory === category}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
