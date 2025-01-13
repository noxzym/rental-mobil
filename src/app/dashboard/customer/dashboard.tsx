"use client";

import { useState } from "react";
import CustOrderManagement from "./_components/CustOrderManagement";
import CustProfile from "./_components/CustProfile";
import CustReviewList from "./_components/CustReviewList";

export default function CustomerDashboard() {
    const [activePage, setActivePage] = useState<string>("profile");

    const renderContent = () => {
        switch (activePage) {
            case "profile":
                return <CustProfile />;
            case "orders":
                return <CustOrderManagement />;
            case "reviews":
                return <CustReviewList />;
            case "chat":
                return <h2>Chat</h2>;
            default:
                return <div>Select a page</div>;
        }
    };

    return renderContent();
}
