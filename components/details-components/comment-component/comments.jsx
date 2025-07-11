import React from 'react';
import { Comment_List } from './comment-list';
import Comment_FormWrapper from './comment-wrapper';

export default function Comments () {
    return (
        <div>
            <Comment_List />
            <Comment_FormWrapper />
        </div>
    );
}
