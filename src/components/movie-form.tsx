'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {MovieFormValues} from '@/types/movies';
import {usePeople} from '@/hooks/use-people';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const movieFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.'
  }),
  releasedYear: z.coerce.number().int().min(1880).max(new Date().getFullYear(), {
    message: `Year must be between 1880 and ${new Date().getFullYear()}.`
  }),
  producerName: z.string().min(2, {
    message: 'Producer name must be at least 2 characters.'
  }),
  directorName: z.string().min(2, {
    message: 'Director name must be at least 2 characters.'
  })
});

interface MovieFormProps {
  defaultValues?: Partial<MovieFormValues>;
  onSubmitAction: (data: MovieFormValues) => void;
  isSubmitting: boolean;
}

export function MovieForm({defaultValues, onSubmitAction, isSubmitting}: MovieFormProps) {
  const {data: people, isLoading: isPeopleLoading} = usePeople();

  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: defaultValues || {
      title: '',
      releasedYear: new Date().getFullYear(),
      producerName: '',
      directorName: ''
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
                  <Input placeholder="Movie title" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="directorName"
            render={({field}) => (
              <FormItem>
                <FormLabel>Director</FormLabel>
                <FormControl>
                  {isPeopleLoading ? (
                    <div className="h-9 flex items-center px-3 border rounded-md border-input">
                      <span className="text-muted-foreground">Loading directors...</span>
                    </div>
                  ) : (
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a director"/>
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
            name="producerName"
            render={({field}) => (
              <FormItem>
                <FormLabel>Producer</FormLabel>
                <FormControl>
                  {isPeopleLoading ? (
                    <div className="h-9 flex items-center px-3 border rounded-md border-input">
                      <span className="text-muted-foreground">Loading producers...</span>
                    </div>
                  ) : (
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a producer"/>
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
            name="releasedYear"
            render={({field}) => (
              <FormItem>
                <FormLabel>Release Year</FormLabel>
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
            {isSubmitting ? 'Saving...' : 'Save Movie'}
          </Button>
        </div>
      </form>
    </Form>
  );
}