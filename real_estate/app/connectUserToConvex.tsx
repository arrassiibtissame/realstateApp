"use client"

import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import React from "react"

function ConnectUserToConvex(): React.ReactNode {
    const { user } = useUser()
    const updateUser = useMutation(api.updateUser)
    return (
        <div>ConnectUserToConvex</div>
    )
}

export default ConnectUserToConvex