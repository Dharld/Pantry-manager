"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import FormStepper from "@/components/ui/form-stepper";
import { toast } from "@/components/ui/use-toast";
import { addProduct } from "@/lib/firebase";
import { Loader } from "@/components/ui/loader";

// Schema for form validation
export const productSchema = z.object({
  id: z.string().optional(), // Assuming id is optional as it might be auto-generated
  name: z.string().min(1, "Product name is required"),
  thumbnail: z.string().url("Invalid thumbnail URL"),
  size: z.string().min(1, "Size is required"),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
  retailPrice: z.number().positive("Retail price must be a positive number"),
  wholeSalePrice: z
    .number()
    .positive("Wholesale price must be a positive number"),
  category: z.string().min(1, "Category is required"),
});

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      thumbnail: "",
      category: "",
      size: "",
      quantity: 0,
      retailPrice: 0,
      wholeSalePrice: 0,
    },
  });

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      router.back();
    }
  };

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      await addProduct(values);
      toast({
        title: "Product added",
        description: "The product has been added successfully.",
        type: "success",
      });
      setOpen(false);
      // Client -> Server (We need a refresh to trigger the call to getProducts)
      router.push("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while adding the product. Please try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const validateStep = async () => {
    let fieldsToValidate = [];
    switch (step) {
      case 1:
        fieldsToValidate = ["name", "thumbnail", "category"];
        break;
      case 2:
        fieldsToValidate = ["retailPrice", "wholeSalePrice"];
        break;
      case 3:
        fieldsToValidate = ["size", "quantity"];
        break;
    }
    const result = await form.trigger(fieldsToValidate);

    if (!result) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
      });
    }
    return result;
  };

  const nextStep = async () => {
    if (await validateStep()) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (!isMounted) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Add New Product</DialogTitle>
          <FormStepper step={step} steps={3} />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-600">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className="text-zinc-600">
                        Thumbnail URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-600">Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="retailPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-600">
                        Retail Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wholeSalePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-600">
                        Wholesale Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 3 && (
              <>
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-600">Size</FormLabel>
                      <FormControl>
                        <Input placeholder="Size" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-600">Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex gap-1 justify-between">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 hover:outline-accent-primary"
                >
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-accent-primary hover:bg-accent-secondary"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1 bg-accent-primary hover:bg-accent-secondary"
                >
                  {isLoading ? (
                    <Loader sm={true} className="border-t-white" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
