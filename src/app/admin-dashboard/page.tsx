"use client";

import { useState } from "react";
import CarManagement from "./_components/CarManagement";
import OrderManagement from "./_components/OrderManagement";
import OrderedCarsList from "./_components/OrderedCarsList";
import ReviewList from "./_components/ReviewList";
import Sidebar from "./_components/Sidebar";
import StatsCards from "./_components/StatsCards";
import UserManagement from "./_components/UserManagement";

export default function AdminDashboardPage() {
    const [activePage, setActivePage] = useState<string>("dashboard");

    const renderContent = () => {
        switch (activePage) {
            case "dashboard":
                return (
                    <>
                        <StatsCards />
                        <OrderedCarsList />
                    </>
                );
            case "cars":
                return (
                    <>
                        <CarManagement />
                    </>
                );
            case "orders":
                return (
                    <>
                        <OrderManagement />
                    </>
                );
            case "users":
                return (
                    <>
                        <UserManagement />
                    </>
                );
            case "reviews":
                return (
                    <>
                        <ReviewList />
                    </>
                );
            case "chat":
                return <div>Chat From User Content</div>;
            default:
                return <div>Select a page</div>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar setActivePage={setActivePage} />
            <div className="flex-1">
                <main className="p-6">{renderContent()}</main>
            </div>
        </div>
    );
}
