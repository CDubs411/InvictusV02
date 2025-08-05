"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContacts } from "@/hooks/use-contacts";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { clientQueries } from "@/lib/database/queries";

const formSchema = z.object({
  contact_id: z.string().uuid({ message: "Please select a contact." }),
  duration: z.coerce.number().int().min(1, "Duration must be at least 1 second."),
  recording_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

export default function NewCallPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { contacts, loading: contactsLoading } = useContacts();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: 0,
      recording_url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const currentUser = await clientQueries.getCurrentUser();
      if (!currentUser) {
        throw new Error("User not found");
      }

      await clientQueries.createCall({
        ...values,
        user_id: currentUser.id,
        company_id: currentUser.company_id,
      });

      toast({
        title: "Success",
        description: "Call logged successfully.",
      });
      router.push("/calls");
    } catch (error) {
      console.error("Error logging call:", error);
      toast({
        title: "Error",
        description: "Failed to log call. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isLoading = contactsLoading;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Log New Call</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Call Details</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-1/4" />
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="contact_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a contact" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contacts.map((contact) => (
                            <SelectItem key={contact.id} value={contact.id}>
                              {contact.name} ({contact.type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (in seconds)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recording_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recording URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/recording.mp3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Logging..." : "Log Call"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
