"use client";

import { authClient } from "@/src/lib/client/auth-client";
import { useEffect } from "react";

export default function SignOut() {
	useEffect(() => {
		const signOutUser = async () => {
			await authClient.signOut();
			window.location.href = "/";
		};
		
		signOutUser();
	}, []);
	
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			
		</div>
	);
}