import CatalogsSection from '../catalogsSection';
import CategoryHighlights from './CategoryHighlights';

export default function HomeCategoryHighlights() {
    return (
        <div>
            <div className="products mt-1">
                <div className="container  p-0">
                    <div className={`product-list`}>
                        <CategoryHighlights />
                    </div>
                </div>
            </div>
            <CatalogsSection />
        </div>
    );
}
