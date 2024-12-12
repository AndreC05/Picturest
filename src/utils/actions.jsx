"use server";

import { redirect } from "next/navigation";


export async function handleNewPost(params) {
    
    
    redirect("/posts/newPost")
}