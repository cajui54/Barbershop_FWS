'use client'
import React from 'react'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { Calendar1Icon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { quickSearchOptions } from '../_constants/search'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { signOut, useSession } from 'next-auth/react'
import SignInDialog from './sign-in-dialog'

const SidebarSheet = () => {
  const { data } = useSession()

  const handleLogoutClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user!.image!} />
            </Avatar>

            <div>
              <p className="font-bold">{data?.user!.name!}</p>
              <p className="text-xs text-gray-400">{data?.user!.email!}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={'icon'}>
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href="/">
            <HomeIcon size={18} />
            Início
          </Link>
        </Button>

        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href={`/bookings`}>
            <Calendar1Icon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>

      <Dialog>
        <div className="flex flex-col gap-2 border-b border-solid py-5">
          {quickSearchOptions.map((option) => (
            <SheetClose key={option.title} asChild>
              <Button variant="ghost" asChild className="justify-start gap-2">
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    alt={option.title}
                    src={option.imageUrl}
                    height={18}
                    width={18}
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>
      </Dialog>
      {data && (
        <div className="flex flex-col gap-2 py-5">
          <Button
            onClick={handleLogoutClick}
            variant="ghost"
            className="justify-start gap-2"
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
