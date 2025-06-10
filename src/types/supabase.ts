export type Category = {
  id: number
  name: string
  description: string | null
  image_url: string | null
  created_at: string
}

export type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category_id: number
  ingredients: string[]
  created_at: string
}

export type Order = {
  id: number
  user_id: string
  total_amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  delivery_address: {
    fullName: string
    street: string
    city: string
    state: string
    zipCode: string
    phone: string
  }
  payment_method: string
  created_at: string
}

export type OrderItem = {
  id: number
  order_id: number
  menu_item_id: number
  quantity: number
  price: number
  created_at: string
}

export type Profile = {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  address: string | null
  role: 'customer' | 'restaurant_owner'
  fcm_token: string | null
  created_at: string
  updated_at: string
}

export type Notification = {
  id: string
  user_id: string | null 
  title: string
  message: string
  sent_at: string
  read_at: string | null
  created_at: string
  read?: boolean // Virtual property added by API
} 