export type VehicleCategory = 'scooter' | 'motorbike' | 'cruiser' | 'dirt_bike'
export type MitraStatus = 'active' | 'pending' | 'suspended' | 'rejected'
export type VehicleStatus = 'available' | 'rented' | 'maintenance'
export type TripStatus = 'upcoming' | 'active' | 'completed' | 'cancelled'
export type VerificationStatus = 'verified' | 'pending' | 'unverified'
export type PaymentMethod = 'visa' | 'mastercard' | 'gopay' | 'ovo' | 'bank_transfer'
export type MessageSender = 'me' | 'them'
export type WithdrawalStatus = 'pending' | 'approved' | 'processing' | 'transferred' | 'rejected'

export interface Vehicle {
  id: string
  name: string
  category: VehicleCategory
  pricePerDay: number
  rating: number
  reviewCount: number
  year: number
  transmission: 'Automatic' | 'Manual'
  engineCc: string
  fuelLiters: number
  isKeyless: boolean
  imageUrl: string
  status: VehicleStatus
  location: string
  totalRentals: number
  revenue: number
  mitraId?: string
  mitraName?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatarUrl?: string
  memberSince: string
  totalTrips: number
  totalSpent: number
  verificationStatus: VerificationStatus
  nationality: string
  licenseExpiry?: string
  rating: number
}

export interface Trip {
  id: string
  bookingCode: string
  vehicle: Vehicle
  customer: Customer
  start: string
  end: string
  status: TripStatus
  pickupAddress: string
  pickupArea: string
  deliveryTime: string
  pickupTime: string
  totalPrice: number
  subtotal: number
  platformFee: number
  protectionPrice: number
  addonsPrice: number
  paymentMethod: PaymentMethod
  addons: string[]
  hasProtection: boolean
  createdAt: string
}

export interface ChatMessage {
  id: string
  sender: MessageSender
  text: string
  time: string
}

export interface MessageThread {
  id: string
  hostName: string
  hostAvatarUrl?: string
  bikeName?: string
  messages: ChatMessage[]
  unreadCount: number
  isVerified: boolean
  lastActivity: string
}

export interface Mitra {
  id: string
  businessName: string
  ownerName: string
  email: string
  phone: string
  location: string
  address: string
  status: MitraStatus
  appliedAt: string
  approvedAt?: string
  description: string
  totalVehicles: number
  activeVehicles: number
  totalRevenue: number
  totalBookings: number
  rating: number
  commissionRate: number
  bankName: string
  bankAccount: string
  bankHolder: string
  avatarUrl?: string
  documents: {
    businessLicense?: string
    ktp: string
    npwp?: string
  }
}

export interface Withdrawal {
  id: string
  mitraId: string
  mitraName: string
  businessName: string
  amount: number
  commission: number       // platform fee dipotong
  netAmount: number        // amount - commission
  bankName: string
  bankAccount: string
  bankHolder: string
  status: WithdrawalStatus
  requestedAt: string
  processedAt?: string
  transferredAt?: string
  period: string           // "April 2026"
  note?: string
  totalOrders: number      // jumlah order dalam periode ini
}

export interface RevenueDataPoint {
  date: string
  revenue: number
  bookings: number
}
