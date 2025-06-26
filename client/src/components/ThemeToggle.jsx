import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ThemeToggle(){
    const [dark, setDark] = useState (
        () => localStorage.getItem("theme") === "dark"// we see the state ofthe browser
    );


    useEffect(() => {
        const root = window.document.documentElement;

        if(dark){
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else{
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");//sets light theme
        }
    }, [dark]);//triggerse when you mount dark theme


    return(
        <Button variant="ghost" size="icon" aria-label="toggle theme" onClick={() => setDark(!dark)}>
            {/* default of dark theme above */}
            {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
    )
}