'use client'
import React from 'react'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { Calendar1Icon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { quickSearchOptions } from '../_constants/search'
import Image from 'next/image'
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import { signIn, signOut, useSession } from 'next-auth/react'

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLoginWithGoogleClick = async () => await signIn('google')
  const handleLogoutClick = () => signOut()
  console.log(data)

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
                <DialogHeader>
                  <DialogTitle>Faça seu login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google.
                  </DialogDescription>
                </DialogHeader>
                <Button
                  onClick={handleLoginWithGoogleClick}
                  variant="outline"
                  className="gap-2 font-bold"
                >
                  <Image
                    src="/Google.png"
                    alt="fazer login com o Google"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost">
          <Calendar1Icon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-2"
            variant="ghost"
          >
            <Image
              alt={option.title}
              src={option.imageUrl}
              height={18}
              width={18}
            />
            {option.title}
          </Button>
        ))}
      </div>

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
    </SheetContent>
  )
}

export default SidebarSheet
