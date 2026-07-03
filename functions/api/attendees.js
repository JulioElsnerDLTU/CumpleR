export async function onRequestGet(context) {
  try {
    const authHeader = context.request.headers.get('Authorization');
    
    // We expect "Bearer <PIN>"
    // The PIN can be set via Cloudflare Pages environment variables. Fallback for local is "7777".
    const secretPin = context.env.ADMIN_PIN || "7777";
    
    if (!authHeader || authHeader !== `Bearer ${secretPin}`) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!context.env.RSVP_DB) {
      return new Response(JSON.stringify({ error: 'El almacenamiento (KV RSVP_DB) no está configurado en Cloudflare.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // List all keys starting with "attendee:"
    const { keys } = await context.env.RSVP_DB.list({ prefix: 'attendee:' });
    
    const attendees = [];
    for (const key of keys) {
      const value = await context.env.RSVP_DB.get(key.name);
      if (value) {
        const parsed = JSON.parse(value);
        parsed.id = key.name;
        attendees.push(parsed);
      }
    }
    
    // Sort by timestamp descending (newest first)
    attendees.sort((a, b) => b.timestamp - a.timestamp);

    return new Response(JSON.stringify(attendees), { 
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

export async function onRequestDelete(context) {
  try {
    const authHeader = context.request.headers.get('Authorization');
    const secretPin = context.env.ADMIN_PIN || "7777";
    
    if (!authHeader || authHeader !== `Bearer ${secretPin}`) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
    }

    const data = await context.request.json();
    const { attendeeId } = data;

    if (!attendeeId) {
      return new Response(JSON.stringify({ error: 'ID de asistente requerido' }), { status: 400 });
    }

    await context.env.RSVP_DB.delete(attendeeId);

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
