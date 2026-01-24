import { Skeleton } from "@/components/ui/skeleton";

export function CoinSkeleton() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-0 space-y-8 animate-pulse">
           
            <Skeleton className="w-32 h-6" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-48 h-10" />
                            <Skeleton className="w-10 h-10 rounded-md" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="w-16 h-6 rounded-full" />
                            <Skeleton className="w-24 h-6 rounded-full" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-left md:text-right">
                    <Skeleton className="w-40 h-10 md:ml-auto" />
                    <Skeleton className="w-24 h-6 md:ml-auto" />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                    <Skeleton className="w-full h-[400px] rounded-xl" />

                    <div className="space-y-4">
                        <Skeleton className="w-48 h-8" />
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-2/3 h-4" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 border rounded-lg space-y-6">
                        <Skeleton className="w-32 h-6 border-b pb-2 mb-4" />

                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex justify-between items-center">
                                <Skeleton className="w-24 h-4" />
                                <Skeleton className="w-20 h-4 font-mono" />
                            </div>
                        ))}

                        <Skeleton className="w-full h-10 mt-4 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}
