export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const { firstName, lastName } = data;
    
    if (!firstName || !lastName) {
      return new Response(JSON.stringify({ error: 'Nombre y apellido son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verificar que el binding de KV exista. Si falta, la lista sería "local"
    // por dispositivo y no se compartiría entre dispositivos.
    if (!context.env.RSVP_DB) {
      return new Response(JSON.stringify({ error: 'El almacenamiento (KV RSVP_DB) no está configurado en Cloudflare.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const attendeeId = `attendee:${Date.now()}:${Math.random().toString(36).substring(7)}`;
    const attendeeData = {
      firstName,
      lastName,
      timestamp: Date.now()
    };

    // Save to KV namespace binding named "RSVP_DB"
    await context.env.RSVP_DB.put(attendeeId, JSON.stringify(attendeeData));

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
