"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin, FaTiktok } from "react-icons/fa6";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, site } from "@/data/site";

const SOCIAL_LINKS = [
  { href: site.socials.github, label: "GitHub profile", Icon: FaGithub },
  { href: site.socials.linkedin, label: "LinkedIn profile", Icon: FaLinkedin },
  { href: site.socials.facebook, label: "Facebook profile", Icon: FaFacebook },
  { href: site.socials.tiktok, label: "TikTok profile", Icon: FaTiktok },
];

const LABEL = "text-lg font-bold uppercase tracking-wide text-foreground";
const FIELD =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors disabled:cursor-not-allowed disabled:opacity-60";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isSending = status === "sending";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      // Parse defensively — a non-JSON error response shouldn't throw here.
      const data: { success?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error, please try again.");
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20 sm:px-10"
    >
      <SectionHeading watermark="CONTACT" title="Get in Touch" />

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        {/* Left: contact info */}
        <div>
          <h3 className={LABEL}>Location</h3>
          <p className="mt-3 flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            {contact.location}
          </p>

          <h3 className={`mt-8 ${LABEL}`}>Phone</h3>
          <div className="mt-3 space-y-2">
            {contact.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-foreground transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {phone}
              </a>
            ))}
          </div>

          <h3 className={`mt-8 ${LABEL}`}>Email</h3>
          <a
            href={`mailto:${contact.email}`}
            className="mt-3 flex items-center gap-2 text-accent hover:underline"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {contact.email}
          </a>

          <h3 className={`mt-10 ${LABEL}`}>Follow Me</h3>
          <ul className="mt-4 flex gap-4">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted transition-colors hover:text-accent"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: message form (UI only for now) */}
        <div>
          <h3 className={LABEL}>Send a Message</h3>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  disabled={isSending}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={FIELD}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  disabled={isSending}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={FIELD}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                disabled={isSending}
                rows={5}
                placeholder="Tell us more about your needs..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={FIELD}
              />
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={isSending}
                className="rounded-full bg-accent-strong px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p
                  role="status"
                  aria-live="polite"
                  className="text-sm text-accent"
                >
                  Thanks! Your message has been sent.
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  aria-live="assertive"
                  className="text-sm text-error"
                >
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
