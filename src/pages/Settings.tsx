import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

function ToggleRow({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-sm font-semibold">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}

function FormRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="grid sm:grid-cols-3 gap-3 py-4 border-b border-border last:border-0 items-start">
      <div className="sm:col-span-1">
        <p className="text-sm font-semibold">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="sm:col-span-2">{children}</div>
    </div>
  )
}

const paymentMethods = [
  { key: 'visa', label: 'Visa / Mastercard', desc: 'Kartu kredit internasional via Midtrans', active: true },
  { key: 'gopay', label: 'GoPay', desc: 'E-wallet via Gojek', active: true },
  { key: 'ovo', label: 'OVO', desc: 'E-wallet via Grab', active: true },
  { key: 'dana', label: 'DANA', desc: 'E-wallet DANA Indonesia', active: false },
  { key: 'bank', label: 'Bank Transfer', desc: 'Transfer bank via VA number', active: true },
  { key: 'qris', label: 'QRIS', desc: 'QR code standar Indonesia', active: false },
]

function PaymentTab() {
  const [methods, setMethods] = useState<Record<string, boolean>>(
    Object.fromEntries(paymentMethods.map(m => [m.key, m.active]))
  )
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metode Pembayaran</CardTitle>
        <CardDescription>Aktifkan metode pembayaran yang diterima platform</CardDescription>
      </CardHeader>
      <CardContent>
        {paymentMethods.map(m => (
          <ToggleRow
            key={m.key}
            label={m.label}
            description={m.desc}
            checked={methods[m.key]}
            onChange={v => setMethods(prev => ({ ...prev, [m.key]: v }))}
          />
        ))}
        <div className="pt-4">
          <Button>Simpan Konfigurasi</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Settings() {
  const [notifs, setNotifs] = useState({
    tripUpdates: true, hostMessages: true, pickupReminder: true,
    promoCodes: false, priceDrops: true, newsletter: false,
    sound: true, badges: true,
  })
  const [insuranceRecommended, setInsuranceRecommended] = useState(true)

  const toggle = (key: keyof typeof notifs) => (v: boolean) =>
    setNotifs(prev => ({ ...prev, [key]: v }))

  return (
    <div className="max-w-3xl space-y-5">
      <Tabs defaultValue="general">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="payment">Pembayaran</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Platform</CardTitle>
              <CardDescription>Konfigurasi dasar platform NusaDrive</CardDescription>
            </CardHeader>
            <CardContent>
              <FormRow label="Nama Platform" description="Nama yang ditampilkan di aplikasi">
                <Input defaultValue="NusaDrive" />
              </FormRow>
              <FormRow label="Email Support" description="Email yang digunakan untuk kontak pelanggan">
                <Input defaultValue="support@nusadrive.id" type="email" />
              </FormRow>
              <FormRow label="Telepon Support">
                <Input defaultValue="+62 812 3456 7890" type="tel" />
              </FormRow>
              <FormRow label="Mata Uang" description="Default: Indonesian Rupiah">
                <Input defaultValue="IDR (Rupiah)" readOnly className="bg-muted" />
              </FormRow>
              <FormRow label="Timezone">
                <Input defaultValue="Asia/Makassar (WITA, UTC+8)" readOnly className="bg-muted" />
              </FormRow>
              <div className="pt-4 flex gap-3">
                <Button>Simpan Perubahan</Button>
                <Button variant="outline">Reset</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Atur notifikasi yang dikirim ke admin dan pelanggan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Aktivitas Trip</p>
              </div>
              <ToggleRow label="Update Trip" description="Notifikasi perubahan status booking" checked={notifs.tripUpdates} onChange={toggle('tripUpdates')} />
              <ToggleRow label="Pesan Host" description="Notifikasi pesan baru dari pelanggan" checked={notifs.hostMessages} onChange={toggle('hostMessages')} />
              <ToggleRow label="Reminder Pickup" description="Pengingat 24 jam sebelum pickup" checked={notifs.pickupReminder} onChange={toggle('pickupReminder')} />

              <Separator className="my-4" />
              <div className="mb-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Promosi</p>
              </div>
              <ToggleRow label="Kode Promo & Diskon" description="Notifikasi promo baru" checked={notifs.promoCodes} onChange={toggle('promoCodes')} />
              <ToggleRow label="Alert Penurunan Harga" checked={notifs.priceDrops} onChange={toggle('priceDrops')} />
              <ToggleRow label="Newsletter" checked={notifs.newsletter} onChange={toggle('newsletter')} />

              <Separator className="my-4" />
              <div className="mb-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Preferensi Aplikasi</p>
              </div>
              <ToggleRow label="Suara Notifikasi" checked={notifs.sound} onChange={toggle('sound')} />
              <ToggleRow label="Badge Counter" description="Tampilkan badge jumlah di tab" checked={notifs.badges} onChange={toggle('badges')} />

              <div className="pt-4">
                <Button>Simpan Preferensi</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment */}
        <TabsContent value="payment">
          <PaymentTab />
        </TabsContent>

        {/* Insurance */}
        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>Konfigurasi Insurance</CardTitle>
              <CardDescription>Atur paket proteksi yang ditawarkan saat booking</CardDescription>
            </CardHeader>
            <CardContent>
              <FormRow label="Provider" description="Nama perusahaan asuransi">
                <Input defaultValue="Garda Oto" />
              </FormRow>
              <FormRow label="Harga per Hari" description="Biaya proteksi per hari (IDR)">
                <Input defaultValue="35000" type="number" />
              </FormRow>
              <FormRow label="Maks. Coverage" description="Nilai maksimum coverage (IDR)">
                <Input defaultValue="50000000" type="number" />
              </FormRow>
              <FormRow label="Coverage Medis (IDR)">
                <Input defaultValue="10000000" type="number" />
              </FormRow>
              <div className="flex items-center justify-between py-3.5 border-b border-border">
                <div>
                  <p className="text-sm font-semibold">Tampilkan sebagai Rekomendasi</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Paket proteksi ditampilkan dengan badge "Rekomendasi"</p>
                </div>
                <Switch checked={insuranceRecommended} onCheckedChange={setInsuranceRecommended} />
              </div>
              <div className="pt-4">
                <Button>Simpan Pengaturan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
