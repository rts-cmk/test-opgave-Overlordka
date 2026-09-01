"use client"

import logoutAction from "./action"

export default function LogoutButton() {
    return (
        <button onClick={() => logoutAction()}>Log ud</button>
    )
}