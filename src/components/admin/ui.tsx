"use client"

import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react"

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

export function Input(props: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const { label, ...rest } = props
  const el = (
    <input
      {...rest}
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${rest.className ?? ""}`}
    />
  )
  return label ? <Field label={label}>{el}</Field> : el
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  const { label, ...rest } = props
  const el = (
    <textarea
      {...rest}
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${rest.className ?? ""}`}
    />
  )
  return label ? <Field label={label}>{el}</Field> : el
}

export function PageHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      {action}
    </div>
  )
}

export function Btn({
  children,
  variant = "primary",
  ...props
}: InputHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" } & { children: ReactNode }) {
  const styles = {
    primary: "text-white",
    ghost: "border border-gray-200 text-gray-700 hover:bg-gray-50",
    danger: "text-red-600 hover:bg-red-50",
  }
  return (
    <button
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 ${styles[variant]} ${props.className ?? ""}`}
      style={variant === "primary" ? { backgroundColor: "var(--color-emerald-deep)" } : undefined}
    >
      {children}
    </button>
  )
}
