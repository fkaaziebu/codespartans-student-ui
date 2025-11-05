"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useRegisterStudent } from "@/common/hooks/mutations";
import { useListOrganizations } from "@/common/hooks/queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Organization = {
  id: string;
  name: string;
};

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  organizationId: string;
  password: string;
  confirmPassword: string;
};

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").trim(),
    lastName: z.string().min(1, "Last name is required").trim(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    organizationId: z.string().min(1, "Please select an organization"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const { registerStudent } = useRegisterStudent();
  const { listOrganizations } = useListOrganizations();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      organizationId: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Search organizations
  const searchOrganizations = async (term: string) => {
    if (!term.trim()) {
      setOrganizations([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await listOrganizations({
        variables: {
          searchTerm: term,
          pagination: {
            first: 10,
          },
        },
      });

      if (response.data?.listOrganizations?.edges) {
        const orgs = response.data.listOrganizations.edges.map(
          (edge: any) => edge.node,
        );
        setOrganizations(orgs);
        setShowDropdown(orgs.length > 0);
      }
    } catch (error) {
      console.error("Error searching organizations:", error);
      setOrganizations([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input with debounce
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debounced search
    const timeout = setTimeout(() => {
      searchOrganizations(value);
    }, 500); // 500ms debounce

    setSearchTimeout(timeout);
  };

  // Select organization
  const handleSelectOrganization = (org: Organization) => {
    setSelectedOrg(org);
    setSearchTerm(org.name);
    setValue("organizationId", org.id);
    setShowDropdown(false);
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedOrg(null);
    setSearchTerm("");
    setValue("organizationId", "");
    setOrganizations([]);
    setShowDropdown(false);
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data, event) => {
    event?.preventDefault();

    try {
      setSuccess(false);

      const response = await registerStudent({
        variables: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          password: data.password,
          organizationId: data.organizationId,
        },
      });

      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }

      setSuccess(true);
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return;
      }
    } finally {
      reset();
      handleClearSelection();
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/courses");
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950">
            Create an account
          </h1>
          <p className="text-gray-500">Enter your details to register</p>
        </div>

        <div className="flex flex-col space-y-6">
          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Registration successful!
              </AlertDescription>
            </Alert>
          )}

          {/* First Name */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-bold text-gray-800"
            >
              First Name
            </label>
            <Input
              id="firstName"
              type="text"
              {...register("firstName")}
              className={cn(
                "py-6 text-gray-600",
                errors.firstName ? "border-red-500" : "",
              )}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-bold text-gray-800"
            >
              Last Name
            </label>
            <Input
              id="lastName"
              type="text"
              {...register("lastName")}
              className={cn(
                "py-6 text-gray-600",
                errors.lastName ? "border-red-500" : "",
              )}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-gray-800">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={cn(
                "py-6 text-gray-600",
                errors.email ? "border-red-500" : "",
              )}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Organization Search */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-gray-800">
              Organization
            </label>
            <div className="relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for your organization..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => {
                    if (organizations.length > 0) {
                      setShowDropdown(true);
                    }
                  }}
                  className={cn(
                    "py-6 text-gray-600 pr-20",
                    errors.organizationId ? "border-red-500" : "",
                    selectedOrg ? "border-green-500" : "",
                  )}
                  disabled={!!selectedOrg}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  {isSearching && (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  )}
                  {selectedOrg ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      <button
                        type="button"
                        onClick={handleClearSelection}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    </>
                  ) : (
                    <Search className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Dropdown */}
              {showDropdown && !selectedOrg && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {organizations.length > 0 ? (
                    <ul className="py-1">
                      {organizations.map((org) => (
                        <li key={org.id}>
                          <button
                            type="button"
                            onClick={() => handleSelectOrganization(org)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                          >
                            <span className="text-sm text-gray-900 font-medium">
                              {org.name}
                            </span>
                            <Check className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      {searchTerm
                        ? "No organizations found"
                        : "Start typing to search"}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Organization Display */}
            {selectedOrg && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {selectedOrg.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="text-green-600 hover:text-green-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {errors.organizationId && (
              <span className="text-sm text-red-500">
                {errors.organizationId.message}
              </span>
            )}

            <p className="text-xs text-gray-500">
              Type to search for your organization by name
            </p>
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-800"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={cn(
                "py-6 text-gray-600",
                errors.password ? "border-red-500" : "",
              )}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-bold text-gray-800"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={cn(
                "py-6 text-gray-600",
                errors.confirmPassword ? "border-red-500" : "",
              )}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-950 cursor-pointer py-6 mt-6"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
