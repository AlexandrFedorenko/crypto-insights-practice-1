import { Header } from "@/components/layout/header";

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
