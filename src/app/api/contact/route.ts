// EN: src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// 1. Inicializa Resend (sin cambios)
const resend = new Resend(process.env.RESEND_API_KEY);

// 2. Esquema de Zod (sin cambios)
const contactFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  services: z.array(z.string()).min(1),
  timeline: z.string().min(1),
  token: z.string().min(1), // El token de reCAPTCHA v2
});

export async function POST(request: Request) {
  console.log('\n--- [SERVER] API /api/contact INVOCADA (V2 Clásico) ---');

  try {
    const body = await request.json();
    console.log('[SERVER] Datos recibidos.');

    // 3. Validación de Zod (sin cambios)
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      console.error('--- [SERVER] ERROR: Zod', validation.error.format());
      return NextResponse.json({ message: 'Datos inválidos' }, { status: 400 });
    }
    
    console.log('[SERVER] Zod OK.');
    const { token, ...formData } = validation.data;

    // 4. VERIFICACIÓN DE reCAPTCHA (Método Clásico 'fetch')
    console.log('[SERVER] Verificando reCAPTCHA v2 (Clásico)...');
    
    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );
    
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      console.error('--- [SERVER] ERROR: reCAPTCHA fallido ---', recaptchaData['error-codes']);
      return NextResponse.json({ message: 'Verificación Anti-Spam fallida' }, { status: 403 });
    }

    // 5. Envío de Correos (sin cambios)
    console.log('[SERVER] reCAPTCHA OK. Enviando correos...');

    // --- ¡USA TUS VALORES REALES AQUÍ! ---
    const dominioVerificado = "updates.andevo.io"; // <-- Tu dominio de Resend
    const correosDeTuEquipo = ["team@andevo.io", "yuri@yualxs.com", "cimasign@gmail.com"]; // <-- ¡Reemplaza con tus 3 correos!
    // ------------------------------------

    const [teamEmail, clientEmail] = await Promise.all([
      
      // === CORREO 1: Notificación para tu equipo ===
      resend.emails.send({
        from: `Nuevo Lead (Andevo) <lead@${dominioVerificado}>`, // <-- CORREGIDO
        to: correosDeTuEquipo, // <-- CORREGIDO
        subject: `Lead: ${formData.name} - Interesado en ${formData.services.join(', ')}`,
        html: `
          <h1>Nuevo Lead de Contacto</h1>
          <p><strong>Nombre:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Teléfono (WhatsApp):</strong> ${formData.phone || 'No provisto'}</p>
          <hr>
          <h2>Detalles del Proyecto</h2>
          <p><strong>Intereses:</strong> ${formData.services.join(', ')}</p>
          <p><strong>Plazo:</strong> ${formData.timeline}</p>
          <hr>
          <h2>Mensaje:</h2>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
        `,
      }),
      
      // === CORREO 2: Auto-Respuesta para el Cliente ===
      resend.emails.send({
        from: process.env.AUTO_REPLY_EMAIL_ADDRESS!, // (Asegúrate que esto en .env.local sea 'Equipo Andevo <hola@updates.andevo.io>')
        to: [formData.email], 
        subject: 'Hemos recibido tu mensaje | Andevo',
        html: `
          <p>¡Hola ${formData.name}!</p>
          <p>Confirmamos que hemos recibido tu mensaje. Gracias por tu interés en Andevo.</p>
          <p>Un especialista de nuestro equipo lo revisará y <strong>se comunicará contigo por WhatsApp</strong> dentro de las próximas 24 horas hábiles para agendar la reunión.</p>
          <br>
          <p>Saludos,</p>
          <p>El Equipo de Andevo</p>
        `,
      }),
    ]);

    if (teamEmail.error) throw teamEmail.error;
    if (clientEmail.error) throw clientEmail.error;

    console.log('[SERVER] Correos enviados. Enviando respuesta 200.');
    return NextResponse.json({ message: 'Mensaje enviado con éxito' });

  } catch (error: any) {
    console.error('--- [SERVER] ERROR CATASTRÓFICO (Catch) ---');
    console.error(error);
    return NextResponse.json(
      { message: 'Error interno del servidor', error: error.message || String(error) },
      { status: 500 }
    );
  }
}