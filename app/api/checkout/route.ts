import { NextRequest } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return Response.json(
      { error: "Stripe n'est pas configuré (STRIPE_SECRET_KEY manquant)" },
      { status: 500 }
    );
  }

  let productId: string;
  try {
    const body = await request.json();
    productId = body.productId;
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  if (!productId || typeof productId !== "string") {
    return Response.json({ error: "productId requis" }, { status: 400 });
  }

  const product = getProduct(productId);
  if (!product) {
    return Response.json({ error: "Produit introuvable" }, { status: 404 });
  }

  const origin = request.nextUrl.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.priceCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/produits/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/produits/cancel`,
      locale: "fr-CA",
    });

    return Response.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur Stripe inconnue";
    return Response.json({ error: message }, { status: 500 });
  }
}
