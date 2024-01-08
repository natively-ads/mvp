"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = () => {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
        </div>
    );
};

export default Page;
