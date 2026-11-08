<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the funnel in the index route with in-memory React state; the provided HTML defines a presentation-only flow, not persistent profile storage.
- Keep reusable resume visuals and the suggestion catalog in a browser-safe presentation module so the picker and premium showcase share model/color combinations.
- Checkout collects name/email/phone in the funnel and redirects to the external Lowify checkout with them as GET params (src/components/lowify-checkout.tsx); payment happens there, never simulated here.
