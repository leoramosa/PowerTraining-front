import { ILoginProps, ILoginResponse } from "@/interface/ILogin";
import { toast } from "sonner";

export async function login(userData: ILoginProps): Promise<ILoginResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();

      const errorMessage = errorResponse?.message || response.statusText;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    return (await response.json()) as ILoginResponse;
  } catch (error: any) {
    toast.error("An unexpected error occurred. Please try again.");
    throw new Error(error.message || "An unexpected error occurred.");
  }
}
