'use server'

import PaletteMaker from "@components/page-structure/PaletteMaker"
import { Suspense } from "react";

export async function generateMetadata() {
    return {
        title: "Palette editor - Palette maker",
        description: "Generate and edit palettes for your next perfect color designs and projects!",
    }
}

export default async function EditPage () {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaletteMaker/>
        </Suspense>
    )
}