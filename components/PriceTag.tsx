import { formatPrice } from '@/lib/formatPrice';
import React from 'react'
import { Badge } from './ui/badge';

interface Props {
    price: number;
    className?: string,
}

export default function PriceTag({price, className}: Props) {
  return (
    <Badge variant={"default"} className={`${className}`}>
        {formatPrice(price)}
    </Badge>
  )
}