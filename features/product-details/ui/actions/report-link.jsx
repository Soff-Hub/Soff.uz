import Link from 'next/link';

// A plain crawlable link: report pages are indexable, and this is how
// Google discovers them from each product page.
function ReportLink({ slug, label = 'shikoyat qiling!', ...rest }) {
    return (
        <Link href={`/report/${slug}`}>
            <a {...rest}>
                <strong className="text-success" style={{ cursor: 'pointer' }}>
                    {label}
                </strong>
            </a>
        </Link>
    );
}

export default ReportLink;
