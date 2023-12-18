import React from "react";

export function PostCard({ postCardInfo }) {
  const [_] = postCardInfo;
  return (
    <div className="mt-9 w-3/4">
      <header>head</header>
      <sub>부제</sub>
      <nav>한줄요약</nav>
      <section>content</section>
    </div>
  );
}
