import { Button } from '@/app/_components/ui/button'
import { db } from '@/app/_lib/prisma'
import {
  ChevronLeftIcon,
  MapPin,
  MapPinIcon,
  MenuIcon,
  StarIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
interface BarbershopPageParams {
  params: {
    id: string
  }
}
const BarbershopPage = async ({ params }: BarbershopPageParams) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!barbershop) {
    return notFound()
  }
  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop.imageURL}
          fill
          className="rounded-xl object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-5 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h3 className="font-bold uppercase text-gray-400">Sobre nós</h3>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>
    </div>
  )
}

export default BarbershopPage
