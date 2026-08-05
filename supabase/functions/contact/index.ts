import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

const CONTACT_TO = "contact@monsun.io"
const FROM_EMAIL = Deno.env.get("CONTACT_FROM_EMAIL") ?? "Monsun Website <onboarding@resend.dev>"

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  message?: string
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

function isNonEmptyString(value: unknown, max = 5000) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return jsonResponse({ status: "error", message: "Method not allowed" }, 405)
  }

  let payload: ContactPayload
  try {
    payload = await req.json()
  } catch {
    return jsonResponse({ status: "error", message: "Invalid JSON body" }, 400)
  }

  const name = payload.name?.trim() ?? ""
  const email = payload.email?.trim() ?? ""
  const phone = payload.phone?.trim() ?? ""
  const company = payload.company?.trim() ?? ""
  const service = payload.service?.trim() ?? ""
  const message = payload.message?.trim() ?? ""

  if (
    !isNonEmptyString(name, 200) ||
    !isNonEmptyString(email, 320) ||
    !isValidEmail(email) ||
    !isNonEmptyString(phone, 50) ||
    !isNonEmptyString(company, 200) ||
    !isNonEmptyString(service, 120) ||
    !isNonEmptyString(message, 5000)
  ) {
    return jsonResponse(
      { status: "error", message: "Please fill in all fields with valid values." },
      400,
    )
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")
  const serviceRoleKey =
    Deno.env.get("SUPABASE_SECRET_KEY") ??
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  const resendApiKey = Deno.env.get("RESEND_API_KEY")

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY / SUPABASE_SERVICE_ROLE_KEY")
    return jsonResponse(
      { status: "error", message: "Server is not configured. Please try again later." },
      500,
    )
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)

  const { error: insertError } = await supabase.from("contact_messages").insert({
    name,
    email,
    phone,
    company,
    service,
    message,
  })

  if (insertError) {
    console.error("Insert failed:", insertError)
    return jsonResponse(
      { status: "error", message: "Failed to save your message. Please try again later." },
      500,
    )
  }

  if (resendApiKey) {
    const html = `
      <h2>New contact form message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `[Monsun Contact] ${service} — ${name}`,
        html,
        text: [
          "New contact form message",
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Company: ${company}`,
          `Service: ${service}`,
          "",
          message,
        ].join("\n"),
      }),
    })

    if (!emailRes.ok) {
      const body = await emailRes.text()
      console.error("Resend failed:", emailRes.status, body)
      // Message is already saved — still report success to the visitor
    }
  } else {
    console.warn("RESEND_API_KEY not set — message saved but email not sent")
  }

  return jsonResponse({
    status: "success",
    message: `Thank you for contacting us, ${name}. We'll get back to you soon!`,
  })
})

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}
