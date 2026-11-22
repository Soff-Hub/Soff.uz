// `/scientific-resources` renders the same listing as `/scientific-resources/all` directly.
// It used to answer with a 307 redirect, which search engines flagged as a
// "page with redirect" error. `[slug].jsx` already treats a missing slug as "all".
export { default, getServerSideProps } from './[slug]';
