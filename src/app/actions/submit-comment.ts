"use server";

import { z } from "zod";

const CommentSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    comment: z.string().min(5, { message: "Comment must be at least 5 characters." }),
    slug: z.string(),
});

export type FormState = {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        comment?: string[];
    };
    success: boolean;
};

export async function submitComment(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = CommentSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        comment: formData.get("comment"),
        slug: formData.get("slug"),
    });

    if (!validatedFields.success) {
        return {
            message: "Please correct the errors below.",
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("NEW COMMENT");
    console.log("Post:", validatedFields.data.slug);
    console.log("User:", validatedFields.data.name);
    console.log("Comment:", validatedFields.data.comment);

    return {
        message: "Thank you! Your comment has been submitted.",
        success: true,
    };
}
