import LogoutButton from "@/ui/logout-button";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <>
        <header>
            <LogoutButton />
        </header>
        <main>
            {children}
        </main>
        </>
    )
}