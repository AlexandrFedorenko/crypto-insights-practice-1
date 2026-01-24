"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactFormValues } from "@/lib/schemas";
import { submitContactForm, ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
    const [serverState, setServerState] = useState<ContactState>({ message: "", success: false });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ContactFormValues>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        }
    });

    const onSubmit = async (data: ContactFormValues) => {
        // Bridge RHF data to Server Action
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("message", data.message);

        const result = await submitContactForm(serverState, formData);
        setServerState(result);

        if (result.success) {
            reset();
        }
    };

    if (serverState.success) {
        return (
            <div className="bg-card border rounded-xl p-8 text-center space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">{serverState.message}</p>
                <Button variant="outline" onClick={() => setServerState({ message: "", success: false })}>
                    Send Another
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Name
                    </label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        aria-describedby="name-error"
                        {...register("name")}
                    />
                    {(errors.name || serverState.errors?.name) && (
                        <p id="name-error" className="text-sm text-destructive font-medium">
                            {errors.name?.message || serverState.errors?.name?.[0]}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        aria-describedby="email-error"
                        {...register("email")}
                    />
                    {(errors.email || serverState.errors?.email) && (
                        <p id="email-error" className="text-sm text-destructive font-medium">
                            {errors.email?.message || serverState.errors?.email?.[0]}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Message
                </label>
                <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    className="min-h-[150px]"
                    aria-describedby="message-error"
                    {...register("message")}
                />
                {(errors.message || serverState.errors?.message) && (
                    <p id="message-error" className="text-sm text-destructive font-medium">
                        {errors.message?.message || serverState.errors?.message?.[0]}
                    </p>
                )}
            </div>

            {serverState.message && !serverState.success && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
                    {serverState.message}
                </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                )}
            </Button>
        </form>
    );
}
