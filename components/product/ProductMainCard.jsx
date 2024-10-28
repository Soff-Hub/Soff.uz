import React from 'react'
import FileCard from './file/FileCard'
import AudioCard from './audio/AudioCard'
import VideoCard from './video/VideoCard'
import PlaylistCard from './video/PlaylistCard';
import TemplateCard from './template/TemplateCard';

export default function ProductMainCard({ item, tab }) {
  if (item?.content_type === 'file') {
    return <FileCard {...item} />
  } else if (item?.content_type === 'audio') {
    return <AudioCard {...item} />
  } else if (item?.type === 'playlist') {
    return <PlaylistCard {...item} />
  } else if (item?.content_type === 'video') {
    return <VideoCard {...item} />
  } else if (item?.content_type === 'template') {
    return <TemplateCard {...item} tab={tab} />
  }
  return (
    <div>ProductMainCard</div>
  )
}
