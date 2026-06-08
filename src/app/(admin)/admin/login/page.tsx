import LoginForm from "@/components/admin/LoginForm"

export const metadata = { title: "Login Admin | PPTQ Anas Bin Malik" }

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-emerald-deep)" }}>
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <span className="font-arabic text-2xl text-white">أ</span>
          </div>
          <h1 className="font-display text-3xl text-white font-semibold">Admin Panel</h1>
          <p className="text-white/60 text-sm mt-1">PPTQ Anas Bin Malik</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
