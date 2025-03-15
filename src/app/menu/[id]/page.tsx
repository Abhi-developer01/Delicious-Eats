import ProductDetails from './product-details'

export default function Page({ params }: { params: { id: string } }) {
  return <ProductDetails id={params.id} />
} 