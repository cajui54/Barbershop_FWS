import BarbershopItem from '../_components/barbershop-item'
import Header from '../_components/header'
import Search from '../_components/search'
import { db } from '../_lib/prisma'

interface BarbershopPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopPageProps) => {
  const babershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: 'insensitive',
      },
    },
  })
  return (
    <div>
      <Header />
      <div className="my-8 px-6">
        <Search />
      </div>
      <h2 className="mb-3 mt-6 p-4 text-xs font-bold uppercase text-gray-400">
        Resultados para &quot;{searchParams?.search}&quot;
      </h2>

      <div className="grid grid-cols-2 gap-4 p-5">
        {babershops.map((babershop) => (
          <BarbershopItem key={babershop.id} barbershop={babershop} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopsPage
