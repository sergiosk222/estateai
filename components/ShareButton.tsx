"use client";

export default function ShareButton() {
  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: "EstateAI 3D property",
        url
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    alert("Link copied");
  }

  return (
    <button
      onClick={handleShare}
      className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
    >
      Share 3D link
    </button>
  );
}
