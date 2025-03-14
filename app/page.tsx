import Header from './_components/header'
import { Button } from './_components/ui/button'
import Image from 'next/image'
import { db } from './_lib/prisma'
import BarbershopItem from './_components/barbershop-item'
import { quickSearchOptions } from './_constants/search'
import BookingItem from './_components/booking-item'
import Search from './_components/search'
import Link from 'next/link'
import { authOptions } from './_lib/auth'
import { getServerSession } from 'next-auth'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany()
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })
  const confirmedBookings = session?.user
    ? await db.booking.findMany({
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
    : []

  return (
    <div>
      <Header />
      <div className="p-5 px-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : 'Seja Bem Vindo!'}!
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), 'EEEE, dd', {
              locale: ptBR,
            })}
          </span>
          <span> de </span>
          <span className="capitalize">
            {format(new Date(), 'MMMM', { locale: ptBR })}
          </span>
        </p>

        <div className="mt-6 px-5">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option, index) => (
            <Button key={index} asChild className="gap-2" variant="secondary">
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-11 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-4">Agendamentos</h2>
            <div className="my-1 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}

        <h2 className="my-4">Recomendados</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="my-4">Populares</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
