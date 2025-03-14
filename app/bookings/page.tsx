import React from 'react'
import Header from '../_components/header'
import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'
import { notFound } from 'next/navigation'
import BookingItem from '../_components/booking-item'

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return notFound()
  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  })

  const pastBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  })

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        {confirmedBookings.length === 0 && (
          <>
            <h2 className="text-xl font-bold">Confirmados</h2>
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}

        {pastBookings.length > 0 && (
          <>
            <h2 className="text-xl font-bold">Passados</h2>
            {pastBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
