import React from 'react'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const SignInDialog = () => {
  const handleLoginWithGoogleClick = async () => await signIn('google')
  return (
    <>
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
    </>
  )
}

export default SignInDialog
