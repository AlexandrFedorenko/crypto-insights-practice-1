"use server";

import { ContactSchema } from "@/lib/schemas";

export type ContactState = {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
    success: boolean;
};

export async function submitContactForm(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const validatedFields = ContactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    });

    if (!validatedFields.success) {
        return {
            message: "Please fix the errors below.",
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("NEW CONTACT FORM SUBMISSION");
    console.log("Name:", validatedFields.data.name);
    console.log("Email:", validatedFields.data.email);
    console.log("Message:", validatedFields.data.message);

    return {
        message: "Message sent! We'll get back to you shortly.",
        success: true,
    };
}
