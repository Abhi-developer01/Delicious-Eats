import ProductDetails from './product-details'
import type { Metadata } from 'next'
import { use } from 'react'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Menu Item ${params.id}`,
    description: 'View details about this menu item',
  }
}

export default function Page({ params }: Props) {
  const resolvedParams = use(params)
  return <ProductDetails id={resolvedParams.id} />
} 