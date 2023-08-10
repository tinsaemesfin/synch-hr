import { zodResolver } from "@hookform/resolvers/zod";
import { Tenant } from "@prisma/client";
import bcrypt from "bcrypt";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
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

interface tenantProps {
  initialData: {
    tenantId: string;
    tenantName: string;
    tenantDescription : string;
    tenantCreatedAt: string;
    tenantSuperAdminId: string;
    tenantSuperAdminName: string;
    tenantSuperAdminRole: string;
    tenantSuperAdminUsername: string;
    tenantSuperAdminEmail: string;
  } | null;
}
const formSchema = z.object({
  tenantName: z.string().min(2),
  tenantDescription: z.string().min(10),
  tenantSuperAdminName: z.string().min(2),
  tenantSuperAdminUsername: z.string().min(2),
  tenantSuperAdminEmail: z.string().email(),
  tenantSuperAdminRole: z.string().min(2),
});
type TenantFormValues = z.infer<typeof formSchema>;
const TenantForm: React.FC<tenantProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = initialData ? "Edit Tenant Information" : "Create new Tenant";
  const description = initialData
    ? "update information about your tenant"
    : "Add your tenant information";
  const toastMessage = initialData
    ? "Tenant updated successfully"
    : "Tenant created successfully";
  const action = initialData ? "Save Changes" : "Create Tenant";
  const form = useForm<TenantFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          tenantName: initialData.tenantName,
          tenantDescription: initialData.tenantDescription,
          tenantSuperAdminName: initialData.tenantSuperAdminName,
          tenantSuperAdminRole: initialData.tenantSuperAdminRole,
          tenantSuperAdminUsername: initialData.tenantSuperAdminUsername,
          tenantSuperAdminEmail: initialData.tenantSuperAdminEmail,
        }
      : {
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
      if (initialData) {
        await axios.patch(`/api/tenants/${params.tenantId}`, {name:data.tenantName,description:data.tenantDescription});
        await axios.patch(`/api/users/${initialData.tenantSuperAdminId}`,{
          name: data.tenantSuperAdminName,
          username: data.tenantSuperAdminUsername,
          email: data.tenantSuperAdminEmail,
        } );
        router.refresh();
        toast.success(toastMessage);
      } else {
        const newTenant=await axios.post(`/api/tenants`, {name:data.tenantName,description:data.tenantDescription});
        const hashedPassword = await bcrypt.hash(data.tenantSuperAdminUsername, 10);
        await axios.post(`/api/users`, {
          name: data.tenantSuperAdminName,
          username: data.tenantSuperAdminUsername,
          email: data.tenantSuperAdminEmail,
          role: data.tenantSuperAdminRole,
          tenantId: newTenant.data.id,
          hashedPassword: hashedPassword,          
        });

        router.refresh();
        // router.push(`/admin/tenants/${params.tenantId}`);
        toast.success(toastMessage);
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
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
            name="tenantSuperAdminRole"
            render={({ field }) => (
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
          
        </form>
      </Form>
    </div>
  );
};

export default TenantForm;
