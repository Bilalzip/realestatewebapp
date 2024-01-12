import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const { formdata, id } = reqBody;

        const updateFields:any = {};
        Object.keys(formdata).forEach((key) => {
            if (formdata[key]) {
                console.log(formdata[key]);
                updateFields[key] = formdata[key];
            }
        });

        const find = await Property.findByIdAndUpdate(id, updateFields);

        console.log(find);

        return NextResponse.json({ message: "Changes have been updated" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error updating the document" }, { status: 500 });
    }
}
