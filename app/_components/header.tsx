import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import {
  Calendar1Icon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  Sidebar,
} from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { quickSearchOptions } from '../_constants/search'
import { Avatar, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import SidebarSheet from './sidebar-sheet'

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Image alt="FSW Barber" src="/Logo.png" height={18} width={120} />

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
