export async function GET() {
    const response = await fetch('https://deisishop.pythonanywhere.com/products/');
    const data = await response.json();

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req: Request) {
    const body = await req.json();
    const resp = await fetch(`https://deisishop.pythonanywhere.com/buy/`, {
        method: "POST",
        body: JSON.stringify(body),
    });
    if (!resp.ok) {
        return Response.json({ error: resp.statusText }, { status: resp.status });
    }
    const data = await resp.json();
    if (data.hasOwnProperty("error")) {
        return Response.json({ error: data.error }, { status: 500 });
    }
    return Response.json(data);
}
