import type { Vehicle, Customer, Trip, MessageThread, RevenueDataPoint, Mitra, Withdrawal } from '@/types'

export const vehicles: Vehicle[] = [
  {
    id: 'v1', name: 'Honda Vario 160', category: 'scooter', pricePerDay: 85000,
    rating: 4.9, reviewCount: 127, year: 2023, transmission: 'Automatic',
    engineCc: '160cc', fuelLiters: 5.5, isKeyless: true, status: 'available',
    location: 'Canggu', totalRentals: 89, revenue: 7565000,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    id: 'v2', name: 'Honda PCX 160', category: 'scooter', pricePerDay: 110000,
    rating: 4.8, reviewCount: 94, year: 2023, transmission: 'Automatic',
    engineCc: '160cc', fuelLiters: 8.1, isKeyless: true, status: 'rented',
    location: 'Seminyak', totalRentals: 72, revenue: 7920000,
    imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&q=80',
  },
  {
    id: 'v3', name: 'Yamaha NMAX 155', category: 'scooter', pricePerDay: 100000,
    rating: 4.7, reviewCount: 88, year: 2022, transmission: 'Automatic',
    engineCc: '155cc', fuelLiters: 7.1, isKeyless: false, status: 'available',
    location: 'Canggu', totalRentals: 65, revenue: 6500000,
    imageUrl: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=400&q=80',
  },
  {
    id: 'v4', name: 'Kawasaki Ninja 250', category: 'motorbike', pricePerDay: 175000,
    rating: 4.9, reviewCount: 56, year: 2022, transmission: 'Manual',
    engineCc: '249cc', fuelLiters: 15, isKeyless: false, status: 'available',
    location: 'Ubud', totalRentals: 48, revenue: 8400000,
    imageUrl: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400&q=80',
  },
  {
    id: 'v5', name: 'Yamaha R15 V4', category: 'motorbike', pricePerDay: 165000,
    rating: 4.8, reviewCount: 43, year: 2023, transmission: 'Manual',
    engineCc: '155cc', fuelLiters: 11, isKeyless: false, status: 'rented',
    location: 'Kuta', totalRentals: 41, revenue: 6765000,
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&q=80',
  },
  {
    id: 'v6', name: 'Honda CB150R', category: 'motorbike', pricePerDay: 150000,
    rating: 4.6, reviewCount: 38, year: 2022, transmission: 'Manual',
    engineCc: '150cc', fuelLiters: 12, isKeyless: false, status: 'maintenance',
    location: 'Seminyak', totalRentals: 35, revenue: 5250000,
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80',
  },
  {
    id: 'v7', name: 'Honda Rebel 500', category: 'cruiser', pricePerDay: 280000,
    rating: 5.0, reviewCount: 29, year: 2023, transmission: 'Manual',
    engineCc: '471cc', fuelLiters: 11.1, isKeyless: false, status: 'available',
    location: 'Uluwatu', totalRentals: 28, revenue: 7840000,
    imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80',
  },
  {
    id: 'v8', name: 'Harley Iron 883', category: 'cruiser', pricePerDay: 450000,
    rating: 4.9, reviewCount: 17, year: 2022, transmission: 'Manual',
    engineCc: '883cc', fuelLiters: 12.5, isKeyless: false, status: 'available',
    location: 'Nusa Dua', totalRentals: 19, revenue: 8550000,
    imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&q=80',
  },
  {
    id: 'v9', name: 'Honda CRF 150L', category: 'dirt_bike', pricePerDay: 145000,
    rating: 4.7, reviewCount: 34, year: 2023, transmission: 'Manual',
    engineCc: '149cc', fuelLiters: 7.8, isKeyless: false, status: 'rented',
    location: 'Ubud', totalRentals: 31, revenue: 4495000,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    id: 'v10', name: 'Kawasaki KLX 150', category: 'dirt_bike', pricePerDay: 135000,
    rating: 4.6, reviewCount: 28, year: 2022, transmission: 'Manual',
    engineCc: '150cc', fuelLiters: 5.8, isKeyless: false, status: 'available',
    location: 'Canggu', totalRentals: 27, revenue: 3645000,
    imageUrl: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400&q=80',
  },
]

export const customers: Customer[] = [
  {
    id: 'c1', name: 'James Hartwell', email: 'james.hartwell@gmail.com',
    phone: '+44 7700 900123', memberSince: '2024-01-15', totalTrips: 8,
    totalSpent: 4200000, verificationStatus: 'verified', nationality: 'United Kingdom',
    licenseExpiry: '2027-03-20', rating: 4.9,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
  },
  {
    id: 'c2', name: 'Sarah Chen', email: 'sarah.chen@outlook.com',
    phone: '+65 9123 4567', memberSince: '2024-03-08', totalTrips: 5,
    totalSpent: 2650000, verificationStatus: 'verified', nationality: 'Singapore',
    licenseExpiry: '2026-09-15', rating: 4.7,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  },
  {
    id: 'c3', name: 'Marcus Weber', email: 'marcus.weber@gmail.com',
    phone: '+49 151 12345678', memberSince: '2024-05-02', totalTrips: 3,
    totalSpent: 1380000, verificationStatus: 'pending', nationality: 'Germany',
    licenseExpiry: '2025-12-01', rating: 4.5,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
  },
  {
    id: 'c4', name: 'Anisa Ramadhani', email: 'anisa.r@yahoo.com',
    phone: '+62 812 3456 7890', memberSince: '2024-02-20', totalTrips: 12,
    totalSpent: 5760000, verificationStatus: 'verified', nationality: 'Indonesia',
    licenseExpiry: '2028-06-30', rating: 5.0,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anisa',
  },
  {
    id: 'c5', name: 'Tom Nguyen', email: 'tom.nguyen@hotmail.com',
    phone: '+61 412 345 678', memberSince: '2024-04-11', totalTrips: 2,
    totalSpent: 680000, verificationStatus: 'unverified', nationality: 'Australia',
    rating: 0,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tom',
  },
]

const now = new Date()
const d = (offsetDays: number) => {
  const date = new Date(now)
  date.setDate(date.getDate() + offsetDays)
  return date.toISOString()
}

export const trips: Trip[] = [
  {
    id: 't1', bookingCode: 'NSD-7421', vehicle: vehicles[1], customer: customers[0],
    start: d(0), end: d(3), status: 'active',
    pickupAddress: 'Jl. Pantai Berawa No.12, Canggu', pickupArea: 'Canggu',
    deliveryTime: '09:00', pickupTime: '09:00',
    totalPrice: 380000, subtotal: 330000, platformFee: 25000,
    protectionPrice: 45000, addonsPrice: 0, paymentMethod: 'gopay',
    addons: [], hasProtection: true, createdAt: d(-5),
  },
  {
    id: 't2', bookingCode: 'NSD-7398', vehicle: vehicles[4], customer: customers[1],
    start: d(2), end: d(5), status: 'upcoming',
    pickupAddress: 'Jl. Sunset Road No.45, Seminyak', pickupArea: 'Seminyak',
    deliveryTime: '10:00', pickupTime: '10:00',
    totalPrice: 545000, subtotal: 495000, platformFee: 25000,
    protectionPrice: 75000, addonsPrice: 50000, paymentMethod: 'visa',
    addons: ['Extra Helmet', 'Rain Jacket'], hasProtection: true, createdAt: d(-3),
  },
  {
    id: 't3', bookingCode: 'NSD-7310', vehicle: vehicles[6], customer: customers[3],
    start: d(-7), end: d(-4), status: 'completed',
    pickupAddress: 'Jl. Raya Uluwatu No.8, Jimbaran', pickupArea: 'Uluwatu',
    deliveryTime: '08:00', pickupTime: '08:00',
    totalPrice: 865000, subtotal: 840000, platformFee: 25000,
    protectionPrice: 90000, addonsPrice: 25000, paymentMethod: 'ovo',
    addons: ['Extra Helmet'], hasProtection: true, createdAt: d(-10),
  },
  {
    id: 't4', bookingCode: 'NSD-7285', vehicle: vehicles[0], customer: customers[2],
    start: d(-14), end: d(-11), status: 'completed',
    pickupAddress: 'Jl. Batu Bolong No.5, Canggu', pickupArea: 'Canggu',
    deliveryTime: '11:00', pickupTime: '11:00',
    totalPrice: 305000, subtotal: 255000, platformFee: 25000,
    protectionPrice: 0, addonsPrice: 25000, paymentMethod: 'bank_transfer',
    addons: ['Extra Helmet'], hasProtection: false, createdAt: d(-17),
  },
  {
    id: 't5', bookingCode: 'NSD-7201', vehicle: vehicles[3], customer: customers[1],
    start: d(-21), end: d(-18), status: 'cancelled',
    pickupAddress: 'Jl. Monkey Forest Road, Ubud', pickupArea: 'Ubud',
    deliveryTime: '09:30', pickupTime: '09:30',
    totalPrice: 0, subtotal: 525000, platformFee: 25000,
    protectionPrice: 60000, addonsPrice: 0, paymentMethod: 'visa',
    addons: [], hasProtection: true, createdAt: d(-25),
  },
  {
    id: 't6', bookingCode: 'NSD-7455', vehicle: vehicles[2], customer: customers[4],
    start: d(5), end: d(8), status: 'upcoming',
    pickupAddress: 'Jl. Legian No.88, Kuta', pickupArea: 'Kuta',
    deliveryTime: '10:00', pickupTime: '10:00',
    totalPrice: 350000, subtotal: 300000, platformFee: 25000,
    protectionPrice: 45000, addonsPrice: 0, paymentMethod: 'gopay',
    addons: [], hasProtection: true, createdAt: d(-1),
  },
]

export const messageThreads: MessageThread[] = [
  {
    id: 'mt1', hostName: 'James Hartwell', bikeName: 'Honda PCX 160',
    unreadCount: 2, isVerified: true, lastActivity: new Date(now.getTime() - 15 * 60000).toISOString(),
    hostAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    messages: [
      { id: 'm1', sender: 'them', text: "Hi! I'd like to confirm my pickup location for tomorrow.", time: new Date(now.getTime() - 120 * 60000).toISOString() },
      { id: 'm2', sender: 'me', text: 'Of course! Your pickup is at Jl. Pantai Berawa No.12, Canggu at 09:00.', time: new Date(now.getTime() - 100 * 60000).toISOString() },
      { id: 'm3', sender: 'them', text: 'Perfect, thank you! Can I get the helmet included?', time: new Date(now.getTime() - 20 * 60000).toISOString() },
      { id: 'm4', sender: 'them', text: "Also, what's the fuel policy again?", time: new Date(now.getTime() - 15 * 60000).toISOString() },
    ],
  },
  {
    id: 'mt2', hostName: 'Sarah Chen', bikeName: 'Yamaha R15 V4',
    unreadCount: 0, isVerified: true, lastActivity: new Date(now.getTime() - 3 * 3600000).toISOString(),
    hostAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    messages: [
      { id: 'm5', sender: 'them', text: 'Hello! Is the Yamaha R15 available for 3 days starting Thursday?', time: new Date(now.getTime() - 5 * 3600000).toISOString() },
      { id: 'm6', sender: 'me', text: "Yes, it's available! I've confirmed your booking NSD-7398.", time: new Date(now.getTime() - 4 * 3600000).toISOString() },
      { id: 'm7', sender: 'them', text: 'Amazing, thank you so much!', time: new Date(now.getTime() - 3 * 3600000).toISOString() },
    ],
  },
  {
    id: 'mt3', hostName: 'Marcus Weber', bikeName: 'Honda Vario 160',
    unreadCount: 1, isVerified: false, lastActivity: new Date(now.getTime() - 24 * 3600000).toISOString(),
    hostAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    messages: [
      { id: 'm8', sender: 'them', text: 'Hi, I need to verify my ID before the trip. What documents do I need?', time: new Date(now.getTime() - 25 * 3600000).toISOString() },
      { id: 'm9', sender: 'me', text: "You'll need a valid passport and international driving permit. Please upload via the app.", time: new Date(now.getTime() - 24.5 * 3600000).toISOString() },
      { id: 'm10', sender: 'them', text: "Got it! I'll upload them now.", time: new Date(now.getTime() - 24 * 3600000).toISOString() },
    ],
  },
  {
    id: 'mt4', hostName: 'Anisa Ramadhani', bikeName: 'Honda Rebel 500',
    unreadCount: 0, isVerified: true, lastActivity: new Date(now.getTime() - 7 * 24 * 3600000).toISOString(),
    hostAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anisa',
    messages: [
      { id: 'm11', sender: 'them', text: 'The bike was amazing! Can I extend for 2 more days?', time: new Date(now.getTime() - 7.5 * 24 * 3600000).toISOString() },
      { id: 'm12', sender: 'me', text: "Sure! I've extended your booking. New return date is Friday.", time: new Date(now.getTime() - 7.2 * 24 * 3600000).toISOString() },
      { id: 'm13', sender: 'them', text: 'Perfect, terima kasih banyak! 🙏', time: new Date(now.getTime() - 7 * 24 * 3600000).toISOString() },
    ],
  },
  {
    id: 'mt5', hostName: 'Tom Nguyen', bikeName: undefined,
    unreadCount: 0, isVerified: false, lastActivity: new Date(now.getTime() - 14 * 24 * 3600000).toISOString(),
    hostAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tom',
    messages: [
      { id: 'm14', sender: 'them', text: 'Hi, do you have any dirt bikes available in Ubud?', time: new Date(now.getTime() - 14.5 * 24 * 3600000).toISOString() },
      { id: 'm15', sender: 'me', text: 'Yes! We have the Honda CRF 150L and Kawasaki KLX 150 available.', time: new Date(now.getTime() - 14.2 * 24 * 3600000).toISOString() },
      { id: 'm16', sender: 'them', text: "I'll book the CRF. Thanks!", time: new Date(now.getTime() - 14 * 24 * 3600000).toISOString() },
    ],
  },
]

function generateRevenueData(): RevenueDataPoint[] {
  const data: RevenueDataPoint[] = []
  const baseRevenue = 2800000
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const variance = Math.random() * 0.4 - 0.2
    const weekendBoost = isWeekend ? 0.35 : 0
    const revenue = Math.round(baseRevenue * (1 + variance + weekendBoost))
    const bookings = Math.floor(revenue / 220000) + Math.floor(Math.random() * 2)
    data.push({
      date: date.toISOString().split('T')[0],
      revenue,
      bookings,
    })
  }
  return data
}

export const revenueData: RevenueDataPoint[] = generateRevenueData()

export const mitras: Mitra[] = [
  {
    id: 'm1',
    businessName: 'Canggu Rider Rental',
    ownerName: 'I Wayan Suartana',
    email: 'wayan.suartana@cangguride.com',
    phone: '+62 812 3900 1122',
    location: 'Canggu',
    address: 'Jl. Batu Bolong No. 15, Canggu, Kuta Utara, Badung',
    status: 'active',
    appliedAt: '2024-01-10',
    approvedAt: '2024-01-14',
    description: 'Rental motor terpercaya di kawasan Canggu sejak 2019. Spesialis scooter dan motorbike premium untuk wisatawan.',
    totalVehicles: 4,
    activeVehicles: 3,
    totalRevenue: 28600000,
    totalBookings: 156,
    rating: 4.9,
    commissionRate: 15,
    bankName: 'BCA',
    bankAccount: '1234567890',
    bankHolder: 'I Wayan Suartana',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=CR',
    documents: {
      businessLicense: 'NIB-2024-001234',
      ktp: 'KTP-5101012345678901',
      npwp: '12.345.678.9-012.000',
    },
  },
  {
    id: 'm2',
    businessName: 'Seminyak Wheels',
    ownerName: 'Ni Luh Ayu Pratiwi',
    email: 'ayu@seminyakwheels.id',
    phone: '+62 821 4500 7788',
    location: 'Seminyak',
    address: 'Jl. Sunset Road No. 45, Seminyak, Kuta, Badung',
    status: 'active',
    appliedAt: '2024-02-01',
    approvedAt: '2024-02-05',
    description: 'Menyediakan armada motor berkualitas di Seminyak. Unit selalu bersih, terawat, dan siap antar jemput.',
    totalVehicles: 3,
    activeVehicles: 2,
    totalRevenue: 19800000,
    totalBookings: 98,
    rating: 4.7,
    commissionRate: 15,
    bankName: 'Mandiri',
    bankAccount: '9876543210',
    bankHolder: 'Ni Luh Ayu Pratiwi',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=SW',
    documents: {
      businessLicense: 'NIB-2024-002345',
      ktp: 'KTP-5101023456789012',
    },
  },
  {
    id: 'm3',
    businessName: 'Ubud Adventure Bikes',
    ownerName: 'Ketut Dharma Putra',
    email: 'ketut@ubudadventure.com',
    phone: '+62 813 7600 4433',
    location: 'Ubud',
    address: 'Jl. Monkey Forest Road No. 22, Ubud, Gianyar',
    status: 'active',
    appliedAt: '2024-03-15',
    approvedAt: '2024-03-19',
    description: 'Spesialis motor adventure dan dirt bike untuk menjelajahi alam Ubud dan sekitarnya. Tersedia pemandu lokal.',
    totalVehicles: 3,
    activeVehicles: 3,
    totalRevenue: 22400000,
    totalBookings: 87,
    rating: 4.8,
    commissionRate: 15,
    bankName: 'BNI',
    bankAccount: '1122334455',
    bankHolder: 'Ketut Dharma Putra',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=UA',
    documents: {
      businessLicense: 'NIB-2024-003456',
      ktp: 'KTP-5104034567890123',
      npwp: '23.456.789.0-123.000',
    },
  },
  {
    id: 'm4',
    businessName: 'Bali Cruiser House',
    ownerName: 'Made Agus Wiranata',
    email: 'made.agus@balicruiser.id',
    phone: '+62 818 5500 9911',
    location: 'Nusa Dua',
    address: 'Jl. Pratama No. 8, Tanjung Benoa, Nusa Dua, Badung',
    status: 'pending',
    appliedAt: '2026-05-10',
    description: 'Rental khusus motor cruiser dan touring bike premium. Harley Davidson, Honda Rebel, dan Kawasaki Vulcan tersedia.',
    totalVehicles: 0,
    activeVehicles: 0,
    totalRevenue: 0,
    totalBookings: 0,
    rating: 0,
    commissionRate: 15,
    bankName: 'BRI',
    bankAccount: '2233445566',
    bankHolder: 'Made Agus Wiranata',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=BC',
    documents: {
      businessLicense: 'NIB-2026-004567',
      ktp: 'KTP-5101045678901234',
    },
  },
  {
    id: 'm5',
    businessName: 'Kuta Speed Rental',
    ownerName: 'Putu Eka Santika',
    email: 'putu.eka@kutaspeed.com',
    phone: '+62 822 6700 3344',
    location: 'Kuta',
    address: 'Jl. Legian No. 88, Kuta, Badung',
    status: 'pending',
    appliedAt: '2026-05-14',
    description: 'Menyediakan motor sport dan scooter untuk wisatawan di area Kuta dan Legian. Harga terjangkau dengan kualitas terjaga.',
    totalVehicles: 0,
    activeVehicles: 0,
    totalRevenue: 0,
    totalBookings: 0,
    rating: 0,
    commissionRate: 15,
    bankName: 'BCA',
    bankAccount: '3344556677',
    bankHolder: 'Putu Eka Santika',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=KS',
    documents: {
      ktp: 'KTP-5101056789012345',
    },
  },
  {
    id: 'm6',
    businessName: 'Uluwatu Moto Club',
    ownerName: 'Gede Bayu Permana',
    email: 'gede.bayu@uluwatumoto.com',
    phone: '+62 819 8800 5566',
    location: 'Uluwatu',
    address: 'Jl. Raya Uluwatu No. 100, Pecatu, Kuta Selatan, Badung',
    status: 'suspended',
    appliedAt: '2023-11-20',
    approvedAt: '2023-11-25',
    description: 'Rental motor di kawasan Uluwatu untuk akses ke pantai dan tebing ikonik Bali Selatan.',
    totalVehicles: 2,
    activeVehicles: 0,
    totalRevenue: 8200000,
    totalBookings: 34,
    rating: 3.8,
    commissionRate: 15,
    bankName: 'Mandiri',
    bankAccount: '4455667788',
    bankHolder: 'Gede Bayu Permana',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=UM',
    documents: {
      businessLicense: 'NIB-2023-009876',
      ktp: 'KTP-5101067890123456',
    },
  },
]

export const withdrawals: Withdrawal[] = [
  {
    id: 'w1', mitraId: 'm1', mitraName: 'I Wayan Suartana',
    businessName: 'Canggu Rider Rental',
    amount: 7225000, commission: 1083750, netAmount: 6141250,
    bankName: 'BCA', bankAccount: '1234567890', bankHolder: 'I Wayan Suartana',
    status: 'transferred', requestedAt: '2026-05-01', processedAt: '2026-05-02',
    transferredAt: '2026-05-03', period: 'April 2026', totalOrders: 28,
  },
  {
    id: 'w2', mitraId: 'm2', mitraName: 'Ni Luh Ayu Pratiwi',
    businessName: 'Seminyak Wheels',
    amount: 4950000, commission: 742500, netAmount: 4207500,
    bankName: 'Mandiri', bankAccount: '9876543210', bankHolder: 'Ni Luh Ayu Pratiwi',
    status: 'transferred', requestedAt: '2026-05-01', processedAt: '2026-05-02',
    transferredAt: '2026-05-04', period: 'April 2026', totalOrders: 19,
  },
  {
    id: 'w3', mitraId: 'm3', mitraName: 'Ketut Dharma Putra',
    businessName: 'Ubud Adventure Bikes',
    amount: 5600000, commission: 840000, netAmount: 4760000,
    bankName: 'BNI', bankAccount: '1122334455', bankHolder: 'Ketut Dharma Putra',
    status: 'processing', requestedAt: '2026-05-02', processedAt: '2026-05-03',
    period: 'April 2026', totalOrders: 22,
  },
  {
    id: 'w4', mitraId: 'm1', mitraName: 'I Wayan Suartana',
    businessName: 'Canggu Rider Rental',
    amount: 8450000, commission: 1267500, netAmount: 7182500,
    bankName: 'BCA', bankAccount: '1234567890', bankHolder: 'I Wayan Suartana',
    status: 'pending', requestedAt: '2026-05-16', period: 'Mei 2026', totalOrders: 33,
  },
  {
    id: 'w5', mitraId: 'm2', mitraName: 'Ni Luh Ayu Pratiwi',
    businessName: 'Seminyak Wheels',
    amount: 3850000, commission: 577500, netAmount: 3272500,
    bankName: 'Mandiri', bankAccount: '9876543210', bankHolder: 'Ni Luh Ayu Pratiwi',
    status: 'pending', requestedAt: '2026-05-15', period: 'Mei 2026', totalOrders: 15,
  },
  {
    id: 'w6', mitraId: 'm3', mitraName: 'Ketut Dharma Putra',
    businessName: 'Ubud Adventure Bikes',
    amount: 4200000, commission: 630000, netAmount: 3570000,
    bankName: 'BNI', bankAccount: '1122334455', bankHolder: 'Ketut Dharma Putra',
    status: 'approved', requestedAt: '2026-05-14', processedAt: '2026-05-16',
    period: 'Mei 2026', totalOrders: 17,
  },
  {
    id: 'w7', mitraId: 'm1', mitraName: 'I Wayan Suartana',
    businessName: 'Canggu Rider Rental',
    amount: 6100000, commission: 915000, netAmount: 5185000,
    bankName: 'BCA', bankAccount: '1234567890', bankHolder: 'I Wayan Suartana',
    status: 'transferred', requestedAt: '2026-04-01', processedAt: '2026-04-02',
    transferredAt: '2026-04-03', period: 'Maret 2026', totalOrders: 24,
  },
  {
    id: 'w8', mitraId: 'm6', mitraName: 'Gede Bayu Permana',
    businessName: 'Uluwatu Moto Club',
    amount: 2050000, commission: 307500, netAmount: 1742500,
    bankName: 'Mandiri', bankAccount: '4455667788', bankHolder: 'Gede Bayu Permana',
    status: 'rejected', requestedAt: '2026-05-10', processedAt: '2026-05-11',
    period: 'April 2026', totalOrders: 8,
    note: 'Akun mitra sedang dalam status ditangguhkan. Penarikan tidak dapat diproses.',
  },
]

export const stats = {
  totalVehicles: vehicles.length,
  activeRentals: vehicles.filter(v => v.status === 'rented').length,
  monthlyRevenue: revenueData.slice(-30).reduce((sum, d) => sum + d.revenue, 0),
  pendingVerifications: customers.filter(c => c.verificationStatus === 'pending').length,
  totalCustomers: customers.length,
  availableVehicles: vehicles.filter(v => v.status === 'available').length,
  totalBookings: trips.length,
  completedBookings: trips.filter(t => t.status === 'completed').length,
  totalMitra: mitras.length,
  activeMitra: mitras.filter(m => m.status === 'active').length,
  pendingMitra: mitras.filter(m => m.status === 'pending').length,
  pendingWithdrawals: withdrawals.filter(w => w.status === 'pending').length,
  totalWithdrawalThisMonth: withdrawals
    .filter(w => w.period === 'Mei 2026' && w.status === 'transferred')
    .reduce((s, w) => s + w.netAmount, 0),
}
