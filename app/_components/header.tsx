import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Image alt="FSW Barber" src="/Logo.png" height={18} width={120} />

          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
