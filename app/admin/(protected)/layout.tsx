'use client'

import { AuthGuard } from '@/components/admin/auth-guard'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-[#F6F5F2]">
        <div className="h-screen sticky top-0 overflow-y-auto flex flex-col shrink-0">
          <AdminSidebar />
        </div>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
