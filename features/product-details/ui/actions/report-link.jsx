import { useRouter } from 'next/router';

// Rendered as a button rather than an <a href> so crawlers never discover the
// per-product /report/<slug> URLs. Every product page linked to one, which
// flooded Search Console with hundreds of thousands of "Blocked by robots.txt"
// entries for a form that must never be indexed.
function ReportLink({ slug, label = 'shikoyat qiling!', ...rest }) {
    const router = useRouter();

    return (
        <button
            type="button"
            className="border-0 bg-transparent p-0"
            onClick={() => router.push(`/report/${slug}`)}
            {...rest}>
            <strong className="text-success" style={{ cursor: 'pointer' }}>
                {label}
            </strong>
        </button>
    );
}

export default ReportLink;
