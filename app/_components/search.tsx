'use client'
import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormField, Form, FormItem, FormControl, FormMessage } from './ui/form'

const formSchema = z.object({
  title: z.string().trim().min(1, { message: 'Digite algo para buscar' }),
})
type FormSchema = z.infer<typeof formSchema>
const Search = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })
  const router = useRouter()

  const handleSubmit = (data: FormSchema) => {
    router.push(`/barbershops?title=${data.title}`)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-9">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Faça sua busca.." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <SearchIcon />
          </Button>
        </form>
      </Form>
    </>
  )
}

export default Search
