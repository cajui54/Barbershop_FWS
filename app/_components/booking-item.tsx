'use client'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { Prisma } from '@prisma/client'
import { isFuture, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import Image from 'next/image'
import { formatCurrency } from '../_helpers/currency'
import PhoneItem from './phone-item'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { deleteBooking } from '../_actions/delete-booking'
import { toast } from 'sonner'
import BookingSummary from './booking-summary'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}
const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)
  const { service } = booking
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const handleCancelBookingClick = async () => {
    try {
      deleteBooking(booking.id)
      handleSheetOpenChange(false)
      toast.success('Reserva cancelada com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao cancelar a reserva.')
    }
  }
  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }
  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger className="w-full min-w-[90%] cursor-pointer">
          <Card className="min-w-[90%]">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge
                  className="w-fit"
                  variant={isConfirmed ? 'default' : 'secondary'}
                >
                  {isConfirmed ? 'Confirmado' : 'Finalizado'}
                </Badge>
                <h3 className="font-semibold">{booking.service.name}</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={service.barbershop.imageURL} />
                  </Avatar>
                  <p className="text-sm">{service.barbershop.name}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sn capitalize">
                  {format(booking.date, 'MMMM', { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, 'dd', { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {format(booking.date, 'HH:mm', { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>
          <div className="relative mt-6 flex h-[180px] w-full items-end">
            <Image
              src="/map.png"
              alt={`Mapa da barbearia ${booking.service.name}`}
              fill
              className="rounded-lg object-cover"
            />

            <Card className="z-50 mx-5 mb-3 w-full rounded-lg">
              <CardContent className="flex items-center gap-3 px-5 py-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={service.barbershop.imageURL} />
                </Avatar>

                <div>
                  <h3 className="font-bold">{service.name}</h3>
                  <p className="text-xs">{service.barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Badge
              className="w-fit"
              variant={isConfirmed ? 'default' : 'secondary'}
            >
              {isConfirmed ? 'Confirmado' : 'Finalizado'}
            </Badge>
            <div className="mb-3 mt-6">
              <BookingSummary
                barbershop={service.barbershop}
                service={service}
                selectedDate={booking.date}
              />
            </div>

            <div className="space-y-3">
              {service.barbershop.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone} />
              ))}
            </div>
          </div>

          <SheetFooter className="mt-10">
            <div className="flex items-center gap-3">
              <SheetClose asChild>
                <Button variant="outline" className="!w-full">
                  Voltar
                </Button>
              </SheetClose>

              {isConfirmed && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      Cancelar reserva
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle>
                        Você deseja cancelar sua reserva?
                      </DialogTitle>
                      <DialogDescription>
                        Ao cancelar sua reserva, você parderá sua reserva e não
                        poderá recuperá-la. Essa ação é irreversível.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row gap-3">
                      <DialogClose asChild>
                        <Button variant="secondary" className="w-full">
                          Voltar
                        </Button>
                      </DialogClose>

                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleCancelBookingClick}
                        >
                          Confirmar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default BookingItem
