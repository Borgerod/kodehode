import WorkExperience from "@/components/sections/WorkExperience";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex items-start justify-center p-8">
      <div className="w-full max-w-3xl">
        <div className="mb-4">
          <Link href="/" className="text-sm text-secondary underline">← Back</Link>
        </div>
        <WorkExperience />
      </div>
    </main>
  );
}
