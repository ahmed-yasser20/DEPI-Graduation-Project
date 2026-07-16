import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — MONO" },
      { name: "description", content: "Get in touch with MONO. FAQs, email, phone, and social." },
    ],
  }),
});

const FAQS = [
  { q: "How long does shipping take?", a: "Standard shipping takes 3–5 business days. Express options are available at checkout for 1–2 business days." },
  { q: "Can I return products?", a: "Yes. You can return any item within 30 days of delivery, provided it's in original condition and packaging." },
  { q: "How do refunds work?", a: "Refunds are issued to the original payment method within 5–7 business days after we receive your return." },
  { q: "How do I track my order?", a: "Once your order ships you'll receive a tracking link by email. You can also track from the My Orders page." },
  { q: "What payment methods are accepted?", a: "We accept all major credit cards, Apple Pay, Google Pay, and Klarna via our secure Stripe checkout." },
];

function ContactPage() {
  return (
    <Layout>
      <div className="container-page py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Support</p>
        <h1 className="mt-2 text-4xl font-display font-semibold">Contact us</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">We respond within one business day. Below are quick answers to common questions.</p>

        <div className="mt-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold mb-4">Frequently asked</h2>
            <Accordion type="single" collapsible className="rounded-xl border bg-card">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={"i" + i} className="px-5">
                  <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Reach us</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-muted-foreground" /> hello@mono.shop</li>
                <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /> +1 (555) 010-2044</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Follow us</h3>
              <div className="mt-4 flex gap-2">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-md border hover:bg-muted transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
