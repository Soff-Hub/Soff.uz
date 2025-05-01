import React from 'react'
import TagsComponents from './tagsComponents';

function Tags({ tag }) {
    return (
        <div className="d-flex justify-content-start align-content-center gap-3 flex-wrap mt-4">
            {
                tag.map((item, i) => (
                    <TagsComponents key={i} name={item.name || item} />
                ))
            }
        </div>
    )
}

export default Tags