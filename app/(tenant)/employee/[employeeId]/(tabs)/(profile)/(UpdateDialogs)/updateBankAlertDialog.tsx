"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface IUpdateBankAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    bankName: string;
    bankNumber: number;
  };
}

const UpdateBankAlertDialog: React.FC<IUpdateBankAlertDialogProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);


  const formSchema = z.object({
    bankName: z.string().min(5),
    bankNumber: z.number().min(5),
  });
  type UpdateBankFormValues = z.infer<typeof formSchema>;
  const form = useForm<UpdateBankFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankName: data.bankName,
      bankNumber: data.bankNumber,
    },
  });
  const onSubmit = async (data: UpdateBankFormValues) => {
    // setLoading(true);
    console.log(data);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title="Updating Bank Account"
      description="changing bank account will be effective from next salary report"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`space-y-8 w-full flex flex-col ${
              loading && "disabled"
            }`}
          >
            <div className=" flex flex-row">
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Bank Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Abcd bank"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Account Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      placeholder="01234566"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button disabled={loading} variant={"outline"} onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={loading} variant={"default"} type="submit">
               {!loading ? 'Update' : <Loader2 className="w-6 h-7 animate-spin "/>}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateBankAlertDialog;
