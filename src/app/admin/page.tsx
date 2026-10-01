import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
  // Automatically redirect the root admin route to the dashboard
  redirect('/admin/dashboard');
}
