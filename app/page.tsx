import { SearchIcon } from 'lucide-react'
import Header from './_components/header'
import { Button } from './_components/ui/button'
import { Input } from './_components/ui/input'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Jackson!</h2>
        <p>Segunda-Feira, 05 de agosto.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca.." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-11 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}
