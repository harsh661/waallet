import Sidebar from "@/components/Sidebar/sidebar";
import React from "react";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex h-full">
            <Sidebar />
            <main className="flex-grow">
                {children}
            </main>
        </section>
    );
}