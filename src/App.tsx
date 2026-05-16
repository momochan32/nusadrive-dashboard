import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import Overview from '@/pages/Overview'
import Fleet from '@/pages/Fleet'
import Bookings from '@/pages/Bookings'
import BookingDetail from '@/pages/BookingDetail'
import Mitra from '@/pages/Mitra'
import MitraDetail from '@/pages/MitraDetail'
import Customers from '@/pages/Customers'
import Messages from '@/pages/Messages'
import Analytics from '@/pages/Analytics'
import Settings from '@/pages/Settings'
import OrderHistory from '@/pages/OrderHistory'
import Withdrawals from '@/pages/Withdrawals'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Overview />} />
          <Route path="fleet" element={<Fleet />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:id" element={<BookingDetail />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="mitra" element={<Mitra />} />
          <Route path="mitra/:id" element={<MitraDetail />} />
          <Route path="withdrawals" element={<Withdrawals />} />
          <Route path="customers" element={<Customers />} />
          <Route path="messages" element={<Messages />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
