"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientQueries } from "@/lib/database/queries";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSellers } from "@/hooks/use-sellers";
import { useBuyers } from "@/hooks/use-buyers";
import { useInvestors } from "@/hooks/use-investors";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  seller_id: z.string().uuid(),
  buyer_id: z.string().uuid(),
  investor_id: z.string().uuid().optional(),
  status: z.enum(["new", "quoted", "contracted", "closed"]),
});

export default function NewDealPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { sellers, loading: sellersLoading } = useSellers();
  const { buyers, loading: buyersLoading } = useBuyers();
  const { investors, loading: investorsLoading } = useInvestors();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "new",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // This is a placeholder for the actual user and company ID
      // In a real app, you would get this from the user's session
      const currentUser = await clientQueries.getCurrentUser();
      if (!currentUser) {
        throw new Error("User not found");
      }

      await clientQueries.createDeal({
        ...values,
        company_id: currentUser.company_id,
        created_by: currentUser.id,
      });
      toast({
        title: "Success",
        description: "Deal created successfully.",
      });
      router.push("/deals");
    } catch (error) {
      console.error("Error creating deal:", error);
      toast({
        title: "Error",
        description: "Failed to create deal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isLoading = sellersLoading || buyersLoading || investorsLoading;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Create New Deal</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Deal Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
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
                  name="seller_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seller</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a seller" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sellers.map((seller) => (
                            <SelectItem key={seller.id} value={seller.id}>
                              {seller.name}
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
                  name="buyer_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Buyer</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a buyer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {buyers.map((buyer) => (
                            <SelectItem key={buyer.id} value={buyer.id}>
                              {buyer.name}
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
                  name="investor_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investor (Optional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an investor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {investors.map((investor) => (
                            <SelectItem key={investor.id} value={investor.id}>
                              {investor.name}
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="quoted">Quoted</SelectItem>
                          <SelectItem value="contracted">Contracted</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating..." : "Create Deal"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
