import Navbar from "@/components/Sidebar/navbar";
import React from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="h-full lg:px-10 px-5 container pt-20">
            <Navbar />
            {children}
            <div className="blobs">
                <div className="blob a">a</div>
                <div className="blob b">b</div>
                <div className="blob c">c</div>
            </div>
        </section>
    );
}