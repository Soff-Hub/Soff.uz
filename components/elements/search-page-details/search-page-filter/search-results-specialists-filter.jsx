export default function SearchResultsSpecialists_Filter({ total }) {
    return (
        <p className="countSpecialist">
            {total > 0 ? `${total} ta mutaxassis` : "Mutaxasislar yo'q"}{' '}
        </p>
    );
}
