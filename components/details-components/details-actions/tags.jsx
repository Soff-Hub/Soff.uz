import React from 'react';
import TagsComponents from './tagsComponents';

function Tags({ tag }) {
    const filteredTags = tag?.filter(
        (item) => item?.name && item.name.trim() !== ''
    );
    if (!filteredTags || filteredTags.length === 0) {
        return null;
    }
    return (
        <div className="d-flex align-items-center gap-3 mb-3 flex-wrap mt-4">
            {tag
                ?.filter((item) => item?.name && item.name.trim() !== '')
                .map((item, i) => (
                    <TagsComponents key={i} name={item.name || item} />
                ))}
        </div>
    );
}

export default Tags;
