"use client";

import { useActionState } from "react";
import { submitComment } from "@/app/actions/submit-comment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";

const initialState: {
    message: string;
    success: boolean;
    errors?: Record<string, string[]>;
} = {
    message: "",
    success: false,
    errors: undefined,
};

export function CommentForm({ slug }: { slug: string }) {
    const [state, action, isPending] = useActionState(submitComment, initialState);

    if (state.success) {
        return (
            <div className="bg-muted/30 border rounded-xl p-8 text-center space-y-4 mt-12">
                <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <Send className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Comment Submitted!</h3>
                <p className="text-muted-foreground">{state.message}</p>
            </div>
        );
    }

    return (
        <section className="max-w-2xl mx-auto py-12 border-t mt-12">
            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Leave a Comment</h3>
                <p className="text-muted-foreground">
                    Join the discussion. Your email address will not be published.
                </p>
            </div>

            <form action={action} className="space-y-6">
                <input type="hidden" name="slug" value={slug} />

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Name
                        </label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            required
                        />
                        {state.errors?.name && (
                            <p className="text-sm text-destructive font-medium">
                                {state.errors.name[0]}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                        />
                        {state.errors?.email && (
                            <p className="text-sm text-destructive font-medium">
                                {state.errors.email[0]}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="comment" className="text-sm font-medium">
                        Comment
                    </label>
                    <Textarea
                        id="comment"
                        name="comment"
                        placeholder="Share your thoughts..."
                        required
                        className="min-h-[120px]"
                    />
                    {state.errors?.comment && (
                        <p className="text-sm text-destructive font-medium">
                            {state.errors.comment[0]}
                        </p>
                    )}
                </div>

                {state.message && !state.success && (
                    <p className="text-sm text-destructive font-medium">{state.message}</p>
                )}

                <Button type="submit" size="lg" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Posting...
                        </>
                    ) : (
                        "Post Comment"
                    )}
                </Button>
            </form>
        </section>
    );
}
