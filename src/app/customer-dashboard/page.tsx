"use client";

import { useState } from "react";
import Sidebar from "./_components/Sidebar";
import CustProfile from "./_components/CustProfile";
import CustOrderManagement from "./_components/CustOrderManagement";
import CustReviewList from "./_components/CustReviewList";

export default function CustomerDashboard() {
    const [activePage, setActivePage] = useState<string>("profile");

    const renderContent = () => {
        switch (activePage) {
            case "profile":
                return (
                    <>
                        <CustProfile />
                    </>
                );
            case "orders":
                return (
                    <>
                        <CustOrderManagement />
                    </>
                );
            case "reviews":
                return (
                    <>
                        <CustReviewList />
                    </>
                );
            case "chat":
                return (
                    <>
                        <h2>Chat</h2>
                    </>
                )
            default:
                return <div>Select a page</div>;
        }
    }

    return(
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar setActivePage={setActivePage} />
            <div className="flex-1">
                <main className="p-6">{renderContent()}</main>
            </div>
        </div>

    )
}