import { ContactForm } from "@/components/contact-form";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Crypto Insights',
    description: 'Get in touch with the Crypto Insights team.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Let&apos;s Chat 💬
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Have questions about crypto? Want to suggest a topic? Or just want to say hi?
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Email Us</h3>
                                <p className="text-muted-foreground">hello@cryptoinsights.demo</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Office</h3>
                                <p className="text-muted-foreground">Blockchain Valley, Decentralized City</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
