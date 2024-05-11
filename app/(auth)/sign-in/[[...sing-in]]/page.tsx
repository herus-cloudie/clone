import { SignIn } from "@clerk/nextjs"

const Sign_In = () => {
    return (
        <main dir="ltr" className="flex h-screen w-full items-center justify-center">
            <SignIn />
        </main>
    )
}

export default Sign_In