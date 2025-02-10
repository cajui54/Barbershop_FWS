'use client'
import { toast } from 'sonner'
import { SmartphoneIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

interface PhoneItemProps {
  phone: string
}
const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success('Telefone copiado!')
  }
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
