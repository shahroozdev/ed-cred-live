'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>

const PasswordInput = (props: PasswordInputProps) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? 'text' : 'password'}
        className={`pr-10 h-[50px] !text-[var(--foreground)] ${props.className ?? ''}`} // Ensure space for icon
      />
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
        onClick={() => setShow(!show)}
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </div>
    </div>
  )
}

export default PasswordInput
