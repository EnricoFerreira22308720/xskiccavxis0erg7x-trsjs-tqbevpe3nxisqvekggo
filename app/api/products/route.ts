export async function GET() {
    const response = await fetch('https://deisishop.pythonanywhere.com/products/');
    const data = await response.json();

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
