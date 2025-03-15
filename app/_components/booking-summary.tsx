import React from 'react'
import { Card, CardContent } from './ui/card'
import { formatCurrency } from '../_helpers/currency'
import { Barbershop, BarbershopService } from '@prisma/client'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

interface BookingSummaryProps {
  service: Pick<BarbershopService, 'name' | 'price'>
  barbershop: Pick<Barbershop, 'name'>
  selectedDate: Date
}
const BookingSummary = ({
  barbershop,
  service,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <>
      <Card>
        <CardContent className="space-y-3 p-3">
          <div className="item-center flex justify-between">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm font-bold">
              {formatCurrency(Number(service.price))}
            </p>
          </div>

          <div className="items flex justify-between">
            <h2 className="text-sm text-gray-400">Data</h2>
            <p className="text-sm">
              dd
              {format(selectedDate, "d 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="items flex justify-between">
            <h2 className="text-sm text-gray-400">Horário</h2>
            <p className="text-sm">{format(selectedDate, 'HH:mm')}</p>
          </div>

          <div className="items flex justify-between">
            <h2 className="text-sm text-gray-400">Barbearia</h2>
            <p className="text-sm">{barbershop.name}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingSummary
