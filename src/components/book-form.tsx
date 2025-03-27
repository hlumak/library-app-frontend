'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {BookFormValues} from '@/types/books';
import {usePeople} from '@/hooks/use-people';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const bookFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.'
  }),
  authorName: z.string().min(2, {
    message: 'Author name must be at least 2 characters.'
  }),
  publishedYear: z.coerce.number().int().min(1000).max(new Date().getFullYear(), {
    message: `Year must be between 1000 and ${new Date().getFullYear()}.`
  })
});

interface BookFormProps {
  defaultValues?: Partial<BookFormValues>;
  onSubmitAction: (data: BookFormValues) => void;
  isSubmitting: boolean;
}

export function BookForm({defaultValues, onSubmitAction, isSubmitting}: BookFormProps) {
  const {data: people, isLoading: isPeopleLoading} = usePeople();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: defaultValues || {
      title: '',
      authorName: '',
      publishedYear: new Date().getFullYear()
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Book title" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="authorName"
            render={({field}) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  {isPeopleLoading ? (
                    <div className="h-9 flex items-center px-3 border rounded-md border-input">
                      <span className="text-muted-foreground">Loading authors...</span>
                    </div>
                  ) : (
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an author"/>
                      </SelectTrigger>
                      <SelectContent>
                        {people?.map((person) => (
                          <SelectItem key={person.id} value={person.name}>
                            {person.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publishedYear"
            render={({field}) => (
              <FormItem>
                <FormLabel>Publication Year</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || isPeopleLoading}>
            {isSubmitting ? 'Saving...' : 'Save Book'}
          </Button>
        </div>
      </form>
    </Form>
  );
}