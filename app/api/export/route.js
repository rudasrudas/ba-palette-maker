import { NextResponse } from "next/server"

export const POST = async (req) => {
    const body = await req.json()
    console.log(body)
    const { fileName, fileFormat, content } = body

    const headers = new Headers()

    headers.set('Content-Disposition', `attachment; filename="${fileName}.${fileFormat}"`)
    headers.set('Content-Type', 'text/plain')
    headers.set('Content-Length', '' + content.length)

    const res = new NextResponse(content, {
    status: 200,
    headers
    })

    return res
}