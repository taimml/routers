"use client";

import { authClient } from "@/src/lib/client/auth-client";
import { useEffect } from "react";

export default function SignOut() {
	useEffect(() => {
		authClient.signOut();
        window.location.href = "/";
	}, []);

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			
		</div>
	);
}