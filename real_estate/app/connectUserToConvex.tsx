"use client"

import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import React, { useEffect } from "react"

function ConnectUserToConvex() {
    const { user } = useUser()
    // Check if api.users exists, otherwise use the correct path to your mutation
    const updateUser = useMutation(
        // @ts-expect-error: users may not be typed correctly in generated api
        api?.users?.updateUser || api.updateUser
    )
    useEffect(() => {
        if (!user) {
            return
        }
        const syncUser = async () => {
            try {
                await updateUser({
                    userId: user.id,
                    name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
                    email: user.emailAddresses[0]?.emailAddress ?? "",
                })
            } catch (error) {
                console.error("Error syncing user to Convex:", error)
            }
        }

        syncUser()
    }, [user, updateUser])
    return null
}

export default ConnectUserToConvex