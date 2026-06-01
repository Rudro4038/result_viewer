import React from "react";

export default function Footer() {
    return (
        <footer className="m-auto rounded-full bg-black/80 px-4 py-2 text-sm text-white shadow-lg shadow-black/20">
            &copy; {new Date().getFullYear()}. All rights reserved.
        </footer>
    );
}
