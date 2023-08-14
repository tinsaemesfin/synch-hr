"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const initialData = null;
const formSchema = z.object({
  tenantName: z.string().min(2),
  tenantDescription: z.string().min(10),
  tenantSuperAdminName: z.string().min(2),
  tenantSuperAdminUsername: z.string().min(2),
  tenantSuperAdminEmail: z.string().email(),
  tenantSuperAdminRole: z.string().min(2),
});
type TenantFormValues = z.infer<typeof formSchema>;
const NewTenantForm : React.FC = () => {
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = "Create new Tenant";
  const description = "Add your tenant information";
  const toastMessage = "Tenant created successfully";
  const action = "Create Tenant";
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  const form = useForm<TenantFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantName: "",
      tenantDescription: "",
      tenantSuperAdminName: "",
      tenantSuperAdminRole: "tenantSuperAdmin",
      tenantSuperAdminUsername: "",
      tenantSuperAdminEmail: "",
    },
  });
  const onSubmit = async (data: TenantFormValues) => {
    try {
      setLoading(true);

      const newTenant = await axios.post(`/api/tenants`, {
        name: data.tenantName,
        description: data.tenantDescription,
        adminName: data.tenantSuperAdminName,
        username: data.tenantSuperAdminUsername,
        email: data.tenantSuperAdminEmail,
        role: data.tenantSuperAdminRole,
      });

      router.refresh();
      router.push('/admin')
      // router.push(`/admin/tenants/${params.tenantId}`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`space-y-8 w-full flex flex-col ${loading && 'disabled'}`}
          
          
        >
          <FormField
            control={form.control}
            name="tenantName"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Tenant(Company) Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Company xyz"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tenantSuperAdminName"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Company Super Admin Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="john smith"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tenantDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Company  Description </FormLabel>
                <FormControl>
                  <Input
                  
                    disabled={loading}
                    placeholder="Your Tenant Description Here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tenantSuperAdminRole"
            render={({ field }) => (
              // FIXME: the select is causing ref error 
              <FormItem>
                <FormLabel> Company Super Admin Role </FormLabel>
                <FormControl>
                  <Select {...field} disabled>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenantSuperAdmin">
                        Tenant Super Admin
                      </SelectItem>
                      <SelectItem value="tenantAdmin">Tenant Admin</SelectItem>
                      <SelectItem value="tenantFinance">
                        Tenant Finance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tenantSuperAdminUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Tenant Super Admin Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="johnsmith"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tenantSuperAdminEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Tenant Super Admin Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={loading}
                    placeholder="abcdc@fgh.iz"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewTenantForm;
