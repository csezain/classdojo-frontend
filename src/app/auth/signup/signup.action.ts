"use server";
import connectDB from "@/lib/database/connectToDb";
import Users from "@/lib/database/models/users.model";

interface IUserValues {
  name: string;
  email: string;
  password: string;
}

interface SubmitSignupResponse {
  success: boolean;
  error?: "duplicate_email" | "unknown_error";
}

export async function submitSignup(
  values: IUserValues
): Promise<SubmitSignupResponse> {
  await connectDB();
  try {
    const user = new Users({ ...values, type: "credentials" });
    const saved = await user.save();
    return { success: true };
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return { success: false, error: "duplicate_email" };
    } else {
      return { success: false, error: "unknown_error" };
    }
  }
}
