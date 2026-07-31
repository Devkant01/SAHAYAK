import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBanner() {
    const [Visible, SetVisible] = useState(true);
    const [close, setClose] = useState(false);

    useEffect(() => {
        let LastScrollY = window.scrollY;

        const HandleScroll = () => {
            if (window.scrollY > LastScrollY && window.scrollY > 80 || close) {
                SetVisible(false);
            } else {
                SetVisible(true);
            }

            LastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", HandleScroll);

        return () => window.removeEventListener("scroll", HandleScroll);
    }, []);

    if(close) {
        return null;
    }

    return (
        <div
            className={`sticky top-0 z-50 overflow-hidden bg-gray-200 border-b border-slate-200 transition-all duration-300 ${Visible ? "max-h-10 opacity-100" : "max-h-0 opacity-0 border-b-0"}`}
        >
            <button onClick={()=> setClose(!close)} title="close" className="absolute z-10 right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800 bg-white border rounded-full cursor-pointer">
                <X></X>
            </button>
            <div className="py-1 whitespace-nowrap animate-marquee text-sm font-medium text-slate-600">
                🚧 Early Access • Sahayak is currently under active development.
                Some features may be unavailable or not work as expected. New
                features and improvements are coming soon. Thank you for your
                patience and support!
                &nbsp;&nbsp;&nbsp;&nbsp;
                🚧 Early Access • Sahayak is currently under active development.
                Some features may be unavailable or not work as expected. New
                features and improvements are coming soon. Thank you for your
                patience and support!
            </div>
        </div>
    );
}